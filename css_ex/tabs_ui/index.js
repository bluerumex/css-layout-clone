class Tab {
  constructor(tabsData) {
    this.tabsData = tabsData;
    // tabsData 객체를 기반으로 tab-group 요소를 생성
    this.renderTabs();
  
    this.$tabs = document.querySelectorAll('.tab');
    this.$tabContents = document.querySelectorAll('.tab-content');

    // active 클래스가 지정된 tab 요소와 같은 인덱스의 tab-content 요소를 표시
    this.showContent(this.tabsData.findIndex(({ active }) => active));

    // 이벤트 핸들러 등록
    document.querySelector('.tab-group').addEventListener('click', this.changeTab.bind(this));
  }

  // tabsData 객체를 기반으로 tab-group 요소를 생성
  renderTabs() {
    const html = `
      <ul class="tab-group">
      ${this.tabsData.map(tab =>
        `<li class="tab${tab.active ? ' active' : ''}">
          <i class="icon ${tab.iconClass}"></i>${tab.title}
        </li>`
      ).join('')}
      </ul>
      <div class="tab-content-group">
      ${this.tabsData.map(tab =>
        `<div class="tab-content">${tab.content}</div>`
      ).join('')}
      <div>`;

    document.querySelector('.tabs').insertAdjacentHTML('beforeend', html);
  }

  // 이벤트 핸들러
  changeTab({ target }) {
    // 클릭된 요소가 icon 요소인 경우, 타깃을 부모 요소인 tab 요소로 변경
    target = target.classList.contains('icon') ? target.parentNode : target;

    // 클릭된 요소가 tab 요소가 아니거나 active 클래스가 이미 지정된 요소라면 스킵
    if (!target.classList.contains('tab') || target.classList.contains('active')) return;

    // 타깃 요소가 아니면 active 클래스 제거하고 타깃 요소이면 active 클래스 추가
    this.$tabs.forEach((tab, i) => {
      if (tab === target) {
        // 타깃 요소의 인덱스를 전달
        this.showContent(i);
        target.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
  }

  // active 클래스가 지정된 tab 요소와 같은 인덱스의 tab-content 요소를 표시
  showContent(index) {
    this.$tabContents.forEach((content, i) => {
      content.style.display = i === index ? 'block' : 'none';
    });
  }
}

window.onload = () => {
  const tab = new Tab([
    {
      title: 'HTML',
      active: true,
      iconClass: 'fab fa-html5',
      content: `<strong>HTML(HyperText Markup Language)</strong> is the most basic building block of the Web.
        It describes and defines the content of a webpage along with the basic layout of the webpage.
        Other technologies besides HTML are generally used to describe a web page's
        appearance/presentation(CSS) or functionality/ behavior(JavaScript).`
    },
    {
      title: 'CSS',
      active: false,
      iconClass: 'fab fa-css3',
      content: `<strong>Cascading Style Sheets(CSS)</strong> is a stylesheet language used to describe
        the presentation of a document written in HTML or XML (including XML dialects
        such as SVG, MathML or XHTML). CSS describes how elements should be rendered on screen,
        on paper, in speech, or on other media.`
    },
    {
      title: 'HTML',
      active: false,
      iconClass: 'fab fa-js-square',
      content: `<strong>JavaScript(JS)</strong> is a lightweight interpreted or JIT-compiled programming
        language with first-class functions. While it is most well-known as the scripting
        language for Web pages, many non-browser environments also use it, such as Node.js,
        Apache CouchDB and Adobe Acrobat. JavaScript is a prototype-based, multi-paradigm,
        dynamic language, supporting object-oriented, imperative, and declarative
        (e.g. functional programming) styles.`
    }
  ])
}