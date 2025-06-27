@Library('Shared') _

pipeline {
    agent any

    environment {
        SONAR_HOME = tool "Sonar"
    }

    parameters {
        string(name: 'FRONTEND_DOCKER_TAG', defaultValue: '', description: 'Docker image tag for frontend')
        string(name: 'BACKEND_DOCKER_TAG', defaultValue: '', description: 'Docker image tag for backend')
    }

    stages {
        stage("Validate Parameters") {
            steps {
                script {
                    if (params.FRONTEND_DOCKER_TAG == '' || params.BACKEND_DOCKER_TAG == '') {
                        error("FRONTEND_DOCKER_TAG and BACKEND_DOCKER_TAG must be provided.")
                    }
                }
            }
        }

        stage("Clean Workspace") {
            steps {
                cleanWs()
            }
        }

        stage("Clone Soccerize Repository") {
            steps {
                script {
                    code_checkout("git@gitlab.com:serverlessprojectgroup/soccerize.git", "eks-deploy")
                }
            }
        }

        stage("Trivy Scan") {
            steps {
                trivy_scan()
            }
        }

        // stage("OWASP: Dependency Check") {
        //     steps {
        //         owasp_dependency()
        //     }
        // }

        stage("Static Code Analysis: SonarQube") {
            steps {
                sonarqube_analysis("Sonar", "soccerize", "soccerize")
            }
        }

        stage("SonarQube: Quality Gate") {
            steps {
                sonarqube_code_quality()
            }
        }

       

        stage("Docker Build: Backend & Frontend") {
            steps {
                script {
                    dir('backend-node') {
                        docker_build("soccerize-backend-node", "${params.BACKEND_DOCKER_TAG}", "erysimum")
                    }
                    dir('frontend') {
                        docker_build("soccerize-frontend", "${params.FRONTEND_DOCKER_TAG}", "erysimum")
                    }
                }
            }
        }

        stage("Push Docker Images to Registry") {
            steps {
                script {
                    docker_push("soccerize-backend-node", "${params.BACKEND_DOCKER_TAG}", "erysimum")
                    docker_push("soccerize-frontend", "${params.FRONTEND_DOCKER_TAG}", "erysimum")
                }
            }
        }
    }

    post {
    success {
        script {
            // Archive XML artifacts if found
            def files = findFiles(glob: '*.xml')
            if (files.length > 0) {
                archiveArtifacts artifacts: '*.xml', followSymlinks: false
            } else {
                echo "No XML artifacts found to archive."
            }
        }
    }

    always {
        // Always attempt to trigger downstream job, catch errors safely
        catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
            build job: "Soccerize-CD", parameters: [
                string(name: 'FRONTEND_DOCKER_TAG', value: "${params.FRONTEND_DOCKER_TAG}"),
                string(name: 'BACKEND_DOCKER_TAG', value: "${params.BACKEND_DOCKER_TAG}")
            ], wait: true
        }
    }
}



}
