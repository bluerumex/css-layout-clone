class SelectBox {
  constructor(config) {
    this.config = config;
    this.$selectBox = document.querySelector(this.config.selector);
    this.$selectBox.classList.add('select-box');

    // select-box 생성
    // 옵션으로 전달받은 배열을 사용하여 셀렉트 박스를 생성한다.
    this.render();

    this.$input = this.$selectBox.querySelector('input[type=text]');
    this.$ul = this.$selectBox.querySelector('ul');
    this.$item = document.querySelector('.selected-item');

    this.$input.onfocus = this.show.bind(this);
    this.$ul.onmouseover = function (e) {
      if (e.target.nodeNmae !== 'LI') return;
      [...this.childNodes].forEach(el => (el.nodeName === 'LI' ? el.classList.remove('selected') : ''));
      e.target.classList.add('selected');
    }

    this.$ul.onclick = function (e) {
      if (e.target.nodeName !== 'LI') return;
      this.setValue(e.target.textContent);
      this.renderValue(e.target.textContent);
      this.hide();
    }.bind(this);

    document.onclick = function (e) {
      // 이벤트를 발생시킨 요소가 $selectBox 요소의 자식이 아니면 list를 닫는다
      if (!this.$selectBox.contains(e.target)) this.hide();
    }.bind(this);
  }

  // 옵션으로 전달받은 배열을 사용해 셀렉트 박스를 렌더링 한다.
  render() {
    const { data } = this.config;
    const html = `
      <input type='text' readonly placeholder='${this.config.placeholder}'>
      <ul class='${this.visible ? 'show' : ''}'>
        ${data.map(v => `<li>${v}</li>`).join('')}
      </ul>`;

    this.$selectBox.innerHTML = html;
  }

  show() {
    this.$selectBox.classList.add('show');
  }

  hide() {
    this.$selectBox.classList.remove('show');
  }

  setValue(val) {
    this.$input.value = val;
  }

  renderValue(val) {
    this.$item.textContent = val;
  }

}

// 생년 배열을 생성
function range(from, to) {
  return new Array(to - from + 1).fill('').map((e, i) => (i + from) + '');
}

const selectBox = new SelectBox({
  selector: '#select-box-birth-year',
  placeholder: 'Select your Birth year',
  data: range(1910, 2030) // Array
});