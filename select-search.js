class SearchOptionElement extends HTMLElement {
    constructor() {
      super();
    }

  }
class SearchSelectElement extends HTMLElement {
    constructor() {
      super();
      
    }
  
    searchResult(list,needle=false) {
      if (needle===false) {
        list.forEach(function(item){
          item.classList.add('visible');
        });
      }
      
    }
  
    render() {
  
      let th = this;
      let name = '';
      if (this.hasAttribute('name')) {
        name = this.getAttribute('name');
      }
      let required = false;
      if (this.hasAttribute('required') && this.getAttribute('required')!==false && this.getAttribute('required')!='false') {
        required = true;
      }
  
      let placeholder = '';
      if (this.hasAttribute('placeholder')) {
        placeholder = this.getAttribute('placeholder');
      }
      
      this.bluring = true;
      this.selectedOption = -1;

      function changeSelected(value) {
        th.querySelectorAll('s-option').forEach(function(item){
          if (item.hasAttribute('value')) {
            if (item.getAttribute('value') == value) {
              item.setAttribute('selected','');
            }
            else {
              item.removeAttribute('selected');
            }
          }
        });
      }
  
      let eventChange = new Event('change');
      
      this.attachShadow({mode: 'open'});
      
      this.shadowRoot.innerHTML = `
        <style>
        :host {
          position: relative;
        }

        .input-wrapper {
          border: var(--select-search-border, 1px solid #aaa);
          border-radius: var(--select-search-border-radius, 2px);
          background: var(--select-search-background, initial);
          color: var(--select-search-color, initial);
          font: var(--select-search-font, initial);
          padding: var(--select-search-padding, 0px);
          width: var(--select-search-width, 220px);
          position: relative;
        }
        .input-wrapper::after {
          content: var(--select-search-arrow-symbol, '\\2304');
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          width: var(--select-search-arrow-width, 20px);
          overflow: hidden;
          background: var(--select-search-arrow-background, transparent);
          text-align: center;
          line-height: var(--select-search-arrow-height, normal);
        }
        .input-wrapper.expanded::after {
          content: var(--select-search-arrow-symbol, '\\2304');
          transform: scale(1, -1);
        }
        .input-wrapper.notvalued {
          border: var(--select-search-notvalued-border, 1px solid #aaa);
          background: var(--select-search-notvalued-background, transparent);
        }
        .input-wrapper.errored {
          border: var(--select-search-errored-border, 1px solid #aaa);
          background: var(--select-search-errored-background, transparent);
        }
        input[type="text"] {
          border: 0;
          outline: none;
          background: transparent;
          width: 100%;
          padding: var(--select-search-input-padding, 4px);
          color: var(--select-search-input-color, initial);
          font: var(--select-search-input-font, initial);
          box-sizing: border-box;
        }
        .input-wrapper.notvalued input[type="text"] {
          color: var(--select-search-notvalued-color, initial);
        }
        .input-wrapper.errored input[type="text"] {
          color: var(--select-search-errored-color, initial);
        }
        ::slotted(s-option) {
          display: none;
          cursor: default;
        }
        ::slotted(s-option.visible) {
          display: block;
          padding: var(--select-search-item-padding, 4px 2px);
        }
        ::slotted(s-option.visible:hover) {
          background: var(--select-search-item-hover-background, #eeeeee) !important;
          outline: none;
        }
        ::slotted(s-option.visible:focus) {
          background: var(--select-search-item-focus-background, #eeeeee) !important;
          outline: none;
        }
        ::slotted(s-option.visible[selected]) {
          background: var(--select-search-item-selected-background, #f5f5f5);
        }
        .list-wrapper {
          position: relative;
          width: var(--select-search-width, 220px);
        }
        .slot-wrapper {
          position: absolute;
          background: var(--select-search-list-background, #ffffff);
          border-radius: var(--select-search-list-border-radius, 2px);
          max-height: var(--select-search-list-height, 200px);
          overflow-y: auto;
          overflow-x: hidden;
          width: 100%;
          z-index: 9;
        }
        .input-wrapper.expanded ~ .list-wrapper .slot-wrapper {
          border: var(--select-search-list-border, 1px solid #aaaaaa);
        }
        </style>
        <div class="input-wrapper" id="search_wrapper">
          <input type="text" id="search_field" name="${name}-value" value="" placeholder="${placeholder}" />
        </div>
        <div class="list-wrapper">
        
          <div class="slot-wrapper">
            <slot></slot>
          </div>
        </div>
      `;

      let searchField = this.shadowRoot.getElementById('search_field');

      let optionList = th.querySelectorAll('s-option');

      this.insertAdjacentHTML('afterend',`<input type="hidden" name="${name}" value="" placeholder="" />`);
      this.shadowRoot.getElementById('search_wrapper').addEventListener('mousedown',function(e){
        if (e.target.id == 'search_wrapper') {
            th.bluring = false;
          if (e.target.classList.contains('expanded')) {
            th.querySelectorAll('s-option').forEach(function(item){
              item.classList.remove('visible');
            });
            e.target.classList.remove('expanded');
            
          }
          else {
            document.querySelectorAll('select-search:not([name="'+name+'"])').forEach(function(sItem){
              sItem.shadowRoot.getElementById('search_wrapper').classList.remove('expanded');
              sItem.querySelectorAll('s-option').forEach(function(oItem){
                oItem.classList.remove('visible');
              });
            });
            th.querySelectorAll('s-option').forEach(function(item){
              item.classList.add('visible');
            });
            e.target.classList.add('expanded');
            if (optionList[th.selectedOption]===undefined) {
              optionList[0].focus();
            }
            else {
              optionList[th.selectedOption].focus();
            }
          }
        }
      });
      this.shadowRoot.getElementById('search_wrapper').addEventListener('mouseup',function(e) {
        if (e.target.id == 'search_wrapper') {

          th.bluring = true;
        }
      });

      this.querySelectorAll('s-option').forEach(function(item,index){
        item.setAttribute('tabindex','0');
        if (item.hasAttribute('selected')) {
          th.selectedOption = index;
          th.value = item.getAttribute('value');
          th.displayValue = item.innerHTML;
          document.querySelector('input[name="'+name+'"]').value = th.value;
          th.shadowRoot.querySelector('input[name="'+name+'-value"]').value = th.displayValue;
        }
        item.addEventListener('mousedown',function(e){
          let preValue = th.value;
          th.value = e.target.getAttribute('value');
          th.displayValue = item.innerHTML;
          document.querySelector('input[name="'+name+'"]').value = th.value;
          th.shadowRoot.querySelector('input[name="'+name+'-value"]').value = th.displayValue;
          th.querySelectorAll('s-option').forEach(function(item){
            item.classList.remove('visible');
          });
          let wrap = th.shadowRoot.getElementById('search_wrapper');
          wrap.classList.remove('expanded');
          wrap.classList.remove('notvalued');
          changeSelected(th.value);
          if (preValue != th.value) {
            th.dispatchEvent(eventChange);
          }
        });
        item.addEventListener('blur',function(e){
          if (th.bluring) {
            th.querySelectorAll('s-option').forEach(function(item){
              item.classList.remove('visible');
            });
            let wrap = th.shadowRoot.getElementById('search_wrapper');
            wrap.classList.remove('expanded');
          }
        });
      });
      searchField.addEventListener('focus',function(e){
        th.querySelectorAll('s-option').forEach(function(item){
          item.classList.add('visible');
        });
        let wrap = th.shadowRoot.getElementById('search_wrapper');
        wrap.classList.add('expanded');
      });
      th.addEventListener('keydown',function(e){
        if (e.code=='ArrowDown') {
          th.bluring = false;
          if (th.selectedOption < optionList.length-1) {
            th.selectedOption++;
          }
          else {
            th.selectedOption = 0;
          }
          optionList[th.selectedOption].focus();
          th.bluring = true;
        }
        if (e.code=='ArrowUp') {
          th.bluring = false;
          if (th.selectedOption <= 0) {
            th.selectedOption = optionList.length-1;
          }
          else {
            th.selectedOption--;
          }
          optionList[th.selectedOption].focus();
          th.bluring = true;
        }
        if (e.keyCode==13) {
          let preValue = th.value;
          th.value = e.target.getAttribute('value');
          th.displayValue = e.target.innerHTML;
          document.querySelector('input[name="'+name+'"]').value = th.value;
          th.shadowRoot.querySelector('input[name="'+name+'-value"]').value = th.displayValue;
          th.querySelectorAll('s-option').forEach(function(item){
            item.classList.remove('visible');
          });
          let wrap = th.shadowRoot.getElementById('search_wrapper');
          wrap.classList.remove('expanded');
          changeSelected(th.value);
          if (preValue != th.value) {
            th.dispatchEvent(eventChange);
          }
        }
      });
      searchField.addEventListener('blur',function(e){
        let wrap = th.shadowRoot.getElementById('search_wrapper');
        if (th.bluring) {
          th.querySelectorAll('s-option').forEach(function(item){
            item.classList.remove('visible');
          });
          wrap.classList.remove('expanded');
        }
        if (required) {
          if (e.target.value===null || e.target.value===false || e.target.value===undefined || e.target.value=='undefined' || e.target.value=='') {
            wrap.classList.add('errored');
          }
        }
      });
      searchField.addEventListener('input',function(e){
        let count = 0;
        let val = e.target.value.toLowerCase();
        let resultValue = null;
        let resultDisplayValue = null;
        let preValue = th.value;
        let isResult = 0;
        if (required) {
          if (val!==null && val!==false && val!==undefined && val!='undefined' && val!='') {
            th.shadowRoot.getElementById('search_wrapper').classList.remove('errored');
          }
        }
        th.querySelectorAll('s-option').forEach(function(item){
          let itemVal = item.innerHTML.toLowerCase();
          if (itemVal == val) {
            resultValue = item.getAttribute('value');
            resultDisplayValue = item.innerHTML;
            isResult++;
          }
          if (itemVal.indexOf(val)>-1) {
            item.classList.add('visible');
            count++;
          }
          else {
            item.classList.remove('visible');
          }
        });
        if (isResult==0) {
          th.shadowRoot.getElementById('search_wrapper').classList.add('notvalued');
          resultValue = null;
          resultDisplayValue = null;
        }
        else {
          th.shadowRoot.getElementById('search_wrapper').classList.remove('notvalued');
          th.value = resultValue;
          th.displayValue = resultDisplayValue;
          changeSelected(th.value);
          if (preValue != th.value) {
            th.dispatchEvent(eventChange);
          }
        }
        
        document.querySelector('input[name="'+name+'"]').value = resultValue;
        let wrap = th.shadowRoot.getElementById('search_wrapper');
        if (count>0) {
          if (!wrap.classList.contains('expanded')) {
            wrap.classList.add('expanded');
          }
        }
        else {
          wrap.classList.remove('expanded');
        }
      });
      if (required) {
        document.querySelectorAll('form').forEach(function(iForm){
          let sElement = iForm.querySelector('select-search[name="'+name+'"]');
          if (sElement!==null && sElement==th) {
            iForm.addEventListener('submit',function(e){
              let chkValue = document.querySelector('input[name="'+name+'"]').value;
              console.log(chkValue);
              if (chkValue===null || chkValue===false || chkValue=='' || chkValue===undefined || chkValue=='undefined') {
                e.preventDefault();
                th.shadowRoot.getElementById('search_wrapper').classList.add('errored');
                return false;
              }
            });
          }
        });
      }
    }
  
    connectedCallback() {
      if (!this.rendered) {
        this.render();
        this.rendered = true;
        
      }
    }
  
    static get observedAttributes() {
      return ["name","value","required"];
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      if (name=='name') {
        if (this.shadowRoot) {
          this.shadowRoot.querySelector('input[type="text"]').setAttribute('name',newValue+'-value');
          document.querySelector('input[name="'+oldValue+'"]').setAttribute('name',newValue);
        }
      }
    }
  }
  customElements.define('s-option',SearchOptionElement);
  customElements.define('select-search',SearchSelectElement);