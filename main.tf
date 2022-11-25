terraform {
  required_providers {
    fly = {
      source = "fly-apps/fly"
      version = "0.0.16"
    }
  }
}

resource "fly_app" "feedApp" {
  name = "feed"
  org  = "personal"
}

resource "fly_ip" "feedIp" {
  app        = "feed"
  type       = "v4"
  depends_on = [fly_app.feedApp]
}

resource "fly_ip" "feedIpv6" {
  app        = "feed"
  type       = "v6"
  depends_on = [fly_app.feedApp]
}

resource "fly_machine" "feedMachine" {
  for_each = toset(["gru"])
  app    = "feed"
  region = each.value
  name   = "feed-${each.value}"
  image  = "flyio/iac-tutorial:latest"
  services = [
    {
      ports = [
        {
          port     = 443
          handlers = ["tls", "http"]
        },
        {
          port     = 80
          handlers = ["http"]
        }
      ]
      "protocol" : "tcp",
      "internal_port" : 80
    },
  ]
  cpus = 1
  memorymb = 256
  depends_on = [fly_app.feedApp]
}
