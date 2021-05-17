/**
 * Return formatted stdout
 * @param {*} status String - insert | update | delete
 * @param {*} message String
 */
const leagueLogger = (...data): void => {
  const status: string = data[0];
  const message: string = data[1];

  const deleteCode: string = '\x1b[31m%s\x1b[0m';
  const insertCode: string = '\x1b[32m%s\x1b[0m';
  const updateCode: string = '\x1b[34m%s\x1b[0m';
  const normalCode: string = '\x1b[35m%s\x1b[0m';

  const lCaseString: string = status.toLowerCase();
  const arrow: string = '====>';

  switch (lCaseString) {
    case 'insert':
      console.log(insertCode, arrow, message);
      break;
    case 'delete':
      console.log(deleteCode, arrow, message);
      break;
    case 'update':
      console.log(updateCode, arrow, message);
      break;
    case 'normal':
      console.log(normalCode, arrow, message);
      break;
    default:
      console.log(message);
  }
  console.log('\x1b[0m');
};

export default leagueLogger;
