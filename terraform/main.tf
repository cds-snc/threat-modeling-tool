module "website" {
  source = "github.com/cds-snc/terraform-modules//simple_static_website?ref=v7.4.3"

  domain_name_source = "threat-modeling.cdssandbox.xyz"
  billing_tag_value  = "threat-modeling-tool"
  single_page_app    = true

  providers = {
    aws           = aws
    aws.us-east-1 = aws.us-east-1
  }
}

provider "aws" {
  region = "ca-central-1"
}

provider "aws" {
  alias  = "us-east-1"
  region = "us-east-1"
}
