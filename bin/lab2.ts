#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Lab2Stack } from '../lib/lab2-stack';
import { MingStack } from '../lib/ming-stack';

const app = new cdk.App();

new MingStack(app, 'MingTestStack');
