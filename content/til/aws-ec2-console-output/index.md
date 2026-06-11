---
title: "You can pull EC2 logs from the AWS CLI when SSH and SSM are unavailable"
date: 2026-06-05
draft: false
type: til
description: "When an EC2 instance is unreachable via SSH or SSM, the serial console output and console screenshots are still available through the AWS CLI with no network access to the instance required."
topics: ["aws", "ec2", "debugging", "cli"]
toc: false
authors: ["joshua-ward"]
---

When an EC2 instance is unreachable (bad security group rule, broken SSM agent, botched `sshd` config), you still have two escape hatches via the AWS CLI that don't require any network path to the instance.

## Serial console output

EC2 captures everything written to the instance's serial console (the equivalent of watching a monitor attached to the physical machine). This includes kernel boot messages, cloud-init output, and anything your init system prints before it goes silent.

```bash
aws ec2 get-console-output \
  --instance-id i-0abc123def456 \
  --output text
```

By default this returns the most recent buffered output (up to 64 KB). Add `--latest` to explicitly request the newest snapshot:

```bash
aws ec2 get-console-output \
  --instance-id i-0abc123def456 \
  --latest \
  --output text
```

This is the fastest way to spot a kernel panic, a failed `fsck`, or a cloud-init error that's preventing the instance from finishing its boot.

## CloudWatch Logs (if the agent was running before the outage)

If the instance had the CloudWatch agent configured before it became unreachable, its logs may still be there:

```bash
# List log streams for the instance
aws logs describe-log-streams \
  --log-group-name /var/log/messages \
  --log-stream-name-prefix i-0abc123def456

# Tail the most recent events
aws logs get-log-events \
  --log-group-name /var/log/messages \
  --log-stream-name i-0abc123def456 \
  --limit 100
```
