module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 5.0"

  name = "soccerize-vpc"
  cidr = "10.0.0.0/16"

  azs             = ["us-east-1a", "us-east-1b"]
  public_subnets  = ["10.0.64.0/19", "10.0.96.0/19"]
  private_subnets = ["10.0.0.0/19", "10.0.32.0/19"]

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
    "kubernetes.io/cluster/soccerize-eks" = "owned"
  }

  private_subnet_tags = {
    "kubernetes.io/role/internal-elb" = "1"
    "kubernetes.io/cluster/soccerize-eks" = "owned"
  }
}
module "ec2" {
  source           = "../../modules/ec2"
  instance_name    = "soccerize-bastion"
  instance_type    = "t3.large"
  ami_id           = "ami-020cba7c55df1f615" 
  key_name         = "terra-key"
  public_key_path = "${path.module}/../../../terra-key.pub"
  vpc_id           = module.vpc.vpc_id
  subnet_id        = module.vpc.public_subnet_ids[0] # Assuming VPC outputs public_subnet_ids
  ingress_ports    = [22, 80, 443, 30000, 32767, 465, 9000, 3000, 6443, 25]
}
