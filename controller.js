const jwt = require('jsonwebtoken');

const Justifier = {
  async justifyText(req, res) {
    const { text } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const { email } = jwt.verify(token, 'secretkey');

    const words = text.split(' ');
    const justifiedText = [];
    let line = '';

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      if (line.length + word.length <= 80) {
        line += `${word} `;
      } else {
        justifiedText.push(line.trim());
        line = `${word} `;
      }
    }

    if (line.length > 0) {
      justifiedText.push(line.trim());
    }

      res.send(justifiedText.join('\n'));
  },
};

module.exports = Justifier;
