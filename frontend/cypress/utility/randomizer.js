class Randomizer {
  createAlphanumeric(desiredLength) {
    let text = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < desiredLength; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }
  createNumeric(desiredLength) {
    let text = "";
    const possible = "0123456789";
    for (let i = 0; i < desiredLength; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }
}
module.exports = new Randomizer();
