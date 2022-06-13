#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkMonitoringStack } from '../lib/cdk-monitoring-stack';

const app = new cdk.App();
new CdkMonitoringStack(app, 'CdkMonitoringStack', {
  env: { account: '{Account}', region: 'ap-northeast-2' },
});
