output "instance_id" {
  description = "The ID of the EC2 instance"
  value       = aws_instance.bastion.id
}

output "public_ip" {
  description = "Public IP of the EC2 instance"
  value       = aws_instance.bastion.public_ip
}

output "private_ip" {
  description = "Private IP of the EC2 instance"
  value       = aws_instance.bastion.private_ip
}

output "public_dns" {
  value = aws_instance.bastion.public_dns
}
output "availability_zone" {
  value = aws_instance.bastion.availability_zone
}

output "subnet_id" {
  value = aws_instance.bastion.subnet_id
}
output "instance_type" {
  value = aws_instance.bastion.instance_type
}

output "ami" {
  value = aws_instance.bastion.ami
}
output "security_group_ids" {
  value = aws_instance.bastion.vpc_security_group_ids
}
output "key_pair_name" {
  value = aws_key_pair.terra_key.key_name
}
