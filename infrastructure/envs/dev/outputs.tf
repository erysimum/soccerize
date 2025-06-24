output "vpc_id" {
  value = module.vpc.vpc_id
}

output "public_subnets" {
  value = module.vpc.public_subnets
}

output "private_subnets" {
  value = module.vpc.private_subnets
}

output "bastion_public_ip" {
  description = "Public IP of the bastion EC2 instance"
  value       = module.ec2.public_ip
}

output "security_group_ids"{
 description="security group ids "
 value = module.ec2.security_group_ids
}

output "key_pair_name" {
  value = module.ec2.key_pair_name
}