
/* IMPORT */

import * as _ from 'lodash';
import ask from 'inquirer-helpers';
import chalk from 'chalk';
import * as path from 'path';
import * as tildify from 'tildify';
import Config from './config';
import fetchRepositories from './repositories';
import Utils from './utils';

/* PROMPT */

const Prompt = {

  async command () {

    const commands = Object.keys ( Config.commands );

    if ( !commands.length ) return Utils.throw ( 'No commands found' );

    const list = commands.map ( command => ({
      value: command,
      name: `${command} ${chalk.gray ( Config.commands[command].description || '' )}`,
      short: command
    }));

    const listSorted = _.sortBy ( list, choice => choice.name.toLowerCase () );

    return await ask.list ( 'What command?', listSorted );

  },

  async repositoriesAll () {

    return await ask.yesNo ( 'Use all repositories?' );

  },

  async repositories ( repositories? ) {

    if ( !repositories ) repositories = await fetchRepositories ();

    if ( !repositories.length ) return Utils.throw ( 'No repositories found' );

    const list = repositories.map ( repository => ({
      value: repository,
      name: `${path.basename ( repository )} ${chalk.gray ( tildify ( repository ) )}`,
      short: path.basename ( repository )
    }));

    const listSorted = _.sortBy ( list, choice => choice.name.toLowerCase () );

    return await ask.checkbox ( 'What repositories?', listSorted );

  }

};

/* EXPORT */

export default Prompt;
