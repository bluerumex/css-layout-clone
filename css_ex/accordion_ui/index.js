const $btnToggle = document.querySelector('.toggle');
const $collapse = document.querySelector('.collapse');

$btnToggle.addEventListener('click', () => {
  $collapse.classList.toggle('active')
  $collapse.style.height = $collapse.classList.contains('active') ? $collapse.scrollHeight + 'px' : '0';
});

class Accordion {
  constructor(options) {
    // 기본 옵션과 사용자 지정 옵션을 병합
    this.config = Accordion.mergeConfig(options);
    this.$accordion = document.querySelector(this.config.selector);
    
    this.init();
    // 이벤트 핸들러 내부의 this는 currentTarget
    this.$accordion.addEventListener('click', this.toggle.bind(this));
  }

  static mergeConfig(options) {
    // 기본 옵션
    const config = {
      selector: '#accordion',
      multi: true
    };

    return {
      ...config,
      ...options
    }
  }

  init() {
    // active 클래스가 지정된 li 요소
    const $activeSubmenu = this.$accordion.querySelector('.active .submenu');
    // active 클래스가 지정된 li 요소를 노출 시킨다
    if ($activeSubmenu) {
      $activeSubmenu.style.height = $activeSubmenu.scrollHeight + 'px';
    }
  }

  toggle(event) {
    if (!event.target.classList.contains('menu')) return;

    const $targetItem = event.target.parentNode;

    // 멀티 오픈을 허용하지 않으면 타깃 이외의 모든 submenu를 클로즈한다.
    if (!this.config.multi) {
      [].filter.call(
        this.$accordion.childNodes,
        li => li.nodeType === Node.ELEMENT_NODE && li !== $targetItem && li.classList.contains('active')
      ).forEach(li => {
        li.classList.remove('active');
        li.querySelector('.submenu').style.height = 0;
      });
    }

    // 타깃 li 요소의 active class를 토글한다.
    $targetItem.classList.toggle('active');
    // 타깃 li 요소의 submenu
    const $submenu = $targetItem.querySelector('.submenu');
    // 타깃 li 요소이 submenu를 토글한다.
    $submenu.style.height = $targetItem.classList.contains('active') ?
      $submenu.scrollHeight + 'px' : '0';
  }
}

window.onload = function () {
  const accordion = new Accordion({ multi: false });
};