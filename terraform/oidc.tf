data "aws_region" "current" {}
data "aws_caller_identity" "current" {}

locals {
  pr_review_env = "pr-review-env-manage"
}

module "pr_review_env" {
  source            = "github.com/cds-snc/terraform-modules//gh_oidc_role?ref=v7.4.3"
  billing_tag_value = "threat-modeling-tool"
  roles = [
    {
      name      = local.pr_review_env
      repo_name = "threat-modeling-tool"
      claim     = "pull_request"
    }
  ]
}

resource "aws_iam_role_policy_attachment" "pr_review_env" {
  role       = local.pr_review_env
  policy_arn = aws_iam_policy.pr_review_env.arn
  depends_on = [
    module.pr_review_env
  ]
}

resource "aws_iam_policy" "pr_review_env" {
  name   = local.pr_review_env
  path   = "/"
  policy = data.aws_iam_policy_document.pr_review_env.json
}

data "aws_iam_policy_document" "pr_review_env" {
  source_policy_documents = [
    data.aws_iam_policy_document.lambda_function_manage.json,
    data.aws_iam_policy_document.ecr_image_manage.json,
  ]
}

data "aws_iam_policy_document" "lambda_function_manage" {
  statement {
    effect = "Allow"
    actions = [
      "lambda:AddPermission",
      "lambda:CreateFunction",
      "lambda:CreateFunctionUrlConfig",
      "lambda:DeleteFunction",
      "lambda:DeleteFunctionUrlConfig",
      "lambda:DeleteFunctionConcurrency",
      "lambda:GetFunction",
      "lambda:GetFunctionConfiguration",
      "lambda:GetFunctionUrlConfig",
      "lambda:ListFunctionUrlConfigs",
      "lambda:PutFunctionConcurrency",
      "lambda:UpdateFunctionCode",
      "lambda:UpdateFunctionConfiguration",
      "lambda:UpdateFunctionUrlConfig"
    ]
    resources = [
      "arn:aws:lambda:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:function:pr-review-env-*"
    ]
  }

  statement {
    effect = "Allow"
    actions = [
      "iam:PassRole"
    ]
    resources = [
      aws_iam_role.pr-review-env-lambda.arn
    ]
  }

  statement {
    effect = "Allow"
    actions = [
      "logs:DescribeLogGroups"
    ]
    resources = [
      "*"
    ]
  }

  statement {
    effect = "Allow"
    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:DeleteLogGroup",
      "logs:DeleteLogStream",
      "logs:DeleteRetentionPolicy",
      "logs:DescribeLogStreams",
      "logs:PutRetentionPolicy"
    ]
    resources = [
      "arn:aws:logs:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:log-group:/aws/lambda/pr-review-env-*"
    ]
  }
}

data "aws_iam_policy_document" "ecr_image_manage" {
  statement {
    effect = "Allow"
    actions = [
      "ecr:BatchCheckLayerAvailability",
      "ecr:BatchDeleteImage",
      "ecr:BatchGetImage",
      "ecr:CompleteLayerUpload",
      "ecr:DescribeImages",
      "ecr:DescribeRepositories",
      "ecr:GetDownloadUrlForLayer",
      "ecr:GetRepositoryPolicy",
      "ecr:InitiateLayerUpload",
      "ecr:ListImages",
      "ecr:PutImage",
      "ecr:SetRepositoryPolicy",
      "ecr:UploadLayerPart"
    ]
    resources = [
      aws_ecr_repository.website_staging_container.arn
    ]
  }

  statement {
    effect = "Allow"
    actions = [
      "ecr:GetAuthorizationToken"
    ]
    resources = ["*"]
  }
}

data "aws_iam_policy_document" "pr_review_env_policy_document" {
  statement {
    effect = "Allow"

    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents"
    ]

    resources = [
      "arn:aws:logs:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:*"
    ]
  }
}

resource "aws_iam_role_policy_attachment" "pr-review-env-lambda" {
  role       = aws_iam_role.pr-review-env-lambda.name
  policy_arn = aws_iam_policy.pr-review-env-lambda.arn
}

resource "aws_iam_policy" "pr-review-env-lambda" {
  name   = "pr-review-env-lambda"
  path   = "/"
  policy = data.aws_iam_policy_document.pr_review_env_policy_document.json
}

data "aws_iam_policy_document" "pr-review-env-lambda-execution" {
  statement {
    effect = "Allow"

    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}
resource "aws_iam_role" "pr-review-env-lambda" {
  name               = "pr-review-env-lambda"
  assume_role_policy = data.aws_iam_policy_document.pr-review-env-lambda-execution.json
}