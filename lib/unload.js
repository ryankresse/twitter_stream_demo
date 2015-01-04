function unload (res, stream) {
  stream = null;
  console.log('unload');
  res.send('stream nullified');
}

exports.unload = unload;