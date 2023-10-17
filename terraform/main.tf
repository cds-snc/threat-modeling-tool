module "website" {
 source  = "github.com/cds-snc/terraform-modules//simple_static_website?ref=v7.2.0"

 domain_name_source = "threat-modeling.cdssandbox.xyz"
 billing_tag_value  = "threat-modeling-tool"

 providers = {
   aws           = aws
   aws.us-east-1 = aws.us-east-1
 }
}