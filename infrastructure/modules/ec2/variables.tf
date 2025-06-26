variable "instance_name" {
  description = "Name tag for the EC2 instance"
  type        = string
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.large"
}

variable "ami_id" {
  description = "AMI ID to use for the EC2 instance"
  type        = string
}

variable "key_name" {
  description = "Name of the key pair to use for SSH to our bastion host"
  type        = string
}

variable "public_key_path" {
  description = "Path public key file"
  type        = string
}

variable "my_vpc_id" {
  description = "VPC ID where the instance will be launched"
  type        = string
}

variable "my_subnet_id" {
  description = "Public subnet ID for launching EC2"
  type        = string
}

variable "ingress_ports" {
  description = "List of ingress ports to allow"
  type        = list(number)
  default     = [22, 80, 443, 30000, 32767, 465, 9000, 3000, 5000,6443, 25]
}


