#!/usr/bin/env node
import yargs = require("yargs");
import "loglevel";
import { ArgsOptions } from "./arguments/ArgsOptions";
import { commonActionCreators } from "./common/redux";
import { CliArgsValues } from "./common/types/CliArgsValues";
import { store } from "./globalState";
import { performSteps } from "./steps";

const argv: CliArgsValues = yargs.options(ArgsOptions).argv as CliArgsValues;

store.dispatch(commonActionCreators.setCliArgs(argv));

performSteps(argv);
