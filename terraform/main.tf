terraform {
  backend "s3" {
    bucket = "recapcloud-tfstate-bucket"
    key    = "global/s3/terraform.tfstate"
    region = "eu-central-1"
  }
}