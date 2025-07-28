module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 5.0"

  name = "soccerize-vpc"
  cidr = "10.0.0.0/16"

  azs             = ["us-east-1a", "us-east-1b"]
  public_subnets  = ["10.0.64.0/19", "10.0.96.0/19"]
  private_subnets = ["10.0.0.0/19", "10.0.32.0/19"]
  #if needed in future ->10.0.128.0 , 10.0.160.0 , 10.0.192.0, 10.0.224.0

  enable_nat_gateway = true
  single_nat_gateway = true
  enable_dns_support = true
  enable_dns_hostnames = true

  tags = {
    Environment = "dev"
    Project     = "soccerize"
  }

  public_subnet_tags = {
    "kubernetes.io/role/elb" = "1"
    "kubernetes.io/cluster/soccer" = "owned"
  }

  private_subnet_tags = {
    "kubernetes.io/role/internal-elb" = "1"
    "kubernetes.io/cluster/soccer" = "owned"
  }
}
module "ec2" {
  source           = "../../modules/ec2"
  instance_name    = "soccerize-bastion"
  instance_type    = "t3.large"
  ami_id           = "ami-020cba7c55df1f615" 
  key_name         = "terra-key"
  public_key_path = "${path.module}/../../../terra-key.pub"
  my_vpc_id           = module.vpc.vpc_id #vpc_id is passed to SG
  my_subnet_id        = module.vpc.public_subnets[0] #grabbing the 1st public subnets from module vpc  where we are launching our instance
  ingress_ports    = [22, 80, 443, 8080, 8081,30000, 32767, 465, 9000, 3000,9090,5000, 6443, 25]
}
