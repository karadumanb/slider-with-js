//in contact section you can email me
function sendMail(e) {
  //prevent refreshing the page
  e.preventDefault();

  //gel inputs value of from
  var inputs = document.getElementsByClassName('form-input');
  var obj = {};
  //object value will be like { name: 'baturay', ...}
  for (var i = 0; i < inputs.length; i++) {
    var item = inputs.item(i);
    obj[item.name] = item.value;
  }

  //prompt the mailer in computer
  var body =
    'Hi Baturay, \r\n\r\nI would like to tell you that we found your challenge ' +
    obj.feedback.toLowerCase() +
    '! \r\n I also want to say:\r\n' +
    obj.message +
    '\r\n\r\nHave a nice day!\r\n' +
    obj.name.toUpperCase();
  body = encodeURIComponent(body);
  window.location.href = `mailto:karadumanbaturay@gmail.com&subject=Evaluation%20from%20${obj.name}&body=${body}`;

  //reset the form
  document.getElementById('contact-form').reset();

  //give feedback
  document.getElementById('mail-feedback').style.display = 'block';
  setTimeout(() => {
    document.getElementById('mail-feedback').style.display = 'none';
  }, 8000);
}
