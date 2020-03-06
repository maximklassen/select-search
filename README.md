# Alternative select element with input and search functional

## Installation

To use the element, connect the file in the standard way, e.g.

```html
<script src="https://your-site.com/js/select-search.js"></script>
```

## Using

Syntax is similar to `select` element syntax, e.g.

```html
<select-search name="test" placeholder="input to search" required>
    <s-option value="1">First item</s-option>
    <s-option value="2" selected>Second item</s-option>
    <s-option value="3">Third item</s-option>
</select-search>
```

## Customizing

Element `select-search` can be customized through special properties, e.g.

```css
select-search {
    --select-search-border: 1px solid red;
    --select-search-arrow-background: linear-gradient(0deg, #858585 0%, #dedede 100%);
    --select-search-item-hover-background: #888888;
}
```

### CSS-properties of element


Property name                               |  CSS property type  |  Default value  |
--------------------------------------------|---------------------|-----------------|
**CSS general properties:**                 |                     |                 |
--select-search-border                      |     border          |  1px solid #aaa |
--select-search-border-radius               |     border-radius   |       2px       |
--select-search-background                  |     background      |      initial    |
--select-search-color                       |     color           |      initial    |
--select-search-font                        |     font            |      initial    |
**CSS properties of arrow block:**          |                     |                 |
--select-search-arrow-symbol                |     unicode string  |     '\2304'     |
--select-search-arrow-width                 |     width           |       20px      |
--select-search-arrow-background            |     background      |    transparent  |
**CSS properties of input field:**          |                     |                 |
--select-search-input-padding               |     padding         |        4px      |
--select-search-input-color                 |     color           |      initial    |
--select-search-input-font                  |     font            |      initial    |
**CSS properties of input field - result not found:**|            |                 |
--select-search-notvalued-border            |     border          |  1px solid #aaa |
--select-search-notvalued-background        |     background      |    transparent  |
--select-search-notvalued-color             |     color           |      initial    |
**CSS properties of input field - required is empty:**|           |                 |
--select-search-errored-border              |     border          |  1px solid #aaa |
--select-search-errored-background          |     background      |    transparent  |
--select-search-errored-color               |     color           |      initial    |
**CSS properties of items list:**           |                     |                 |
--select-search-list-background             |     background      |      #ffffff    |
--select-search-list-height <br>*Maximal value of list height*|     height          |       200px     |
--select-search-list-border                 |     border          |  1px solid #aaa |
--select-search-list-border-radius          |     border-radius   |       2px       |
**CSS properties of items:**               |                     |                 |
--select-search-item-padding                |     padding         |     4px 2px     |
--select-search-item-hover-background <br>*Background of mouse hover item*|     background      |     #eeeeee     |
--select-search-item-focus-background <br>*Background of focused item*|     background      |     #eeeeee     |
--select-search-item-selected-background <br>*Background of selected item*    |     background      |     #f5f5f5     |
