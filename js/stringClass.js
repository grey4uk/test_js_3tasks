class StringBuilder {
  constructor(baseString = "") {
    this.value = baseString;
  }

  append(str) {
    this.value = this.value + str;
  }
  prepend(str) {
    this.value = str + this.value;
  }
  pad(str) {
    this.value = str + this.value + str;
  }
}

const builder = new StringBuilder(".");
builder.append("^");
builder.prepend("^");
builder.pad("=");

export const stringClass = () => {
  console.log('String from test1',builder.value); // '=^.^='
};
