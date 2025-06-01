variable "commentary_table_name" {}
variable "websocket_table_name" {}
variable "commentary_queue_arn" {}
variable "role_commentary_lambda" {}
variable "role_ws_connect_lambda" {}
variable "role_ws_disconnect_lambda" {}
variable "role_broadcast_lambda" {}
# variable "websocket_endpoint" {}
variable "broadcast_stream"{}
variable "region" {
  type = string
}
variable "websocket_endpoint_for_lambda" {}
variable "websocket_url_for_frontend" {}
