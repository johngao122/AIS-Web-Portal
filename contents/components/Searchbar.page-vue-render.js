
    var pageVueRenderFn = function anonymous(
) {
with(this){return _c('div',{attrs:{"id":"app"}},[_c('header',{attrs:{"sticky":""}},[_c('navbar',{attrs:{"type":"dark"},scopedSlots:_u([{key:"brand",fn:function(){return [_c('a',{staticClass:"navbar-brand",attrs:{"href":"/index.html","title":"Home"}},[_v("AIS Web Portal")])]},proxy:true}])},[_v(" "),_c('li',[_c('a',{staticClass:"nav-link",attrs:{"href":"/index.html"}},[_v("Home")])]),_v(" "),_c('li',[_c('a',{staticClass:"nav-link",attrs:{"href":"/contents/getting-started.html"}},[_v("Getting Started")])]),_v(" "),_c('li',[_c('a',{staticClass:"nav-link",attrs:{"href":"/contents/architecture.html"}},[_v("Architecture")])]),_v(" "),_c('dropdown',{staticClass:"nav-link",scopedSlots:_u([{key:"header",fn:function(){return [_v("Components")]},proxy:true}])},[_v(" "),_c('dropdown-header',[_v("Map Components")]),_v(" "),_c('li',[_c('a',{staticClass:"dropdown-item",attrs:{"href":"/contents/components/map.html"}},[_v("Map")])]),_v(" "),_c('li',[_c('a',{staticClass:"dropdown-item",attrs:{"href":"/contents/components/MapWithSearchbar.html"}},[_v("MapWithSearchbar")])]),_v(" "),_c('li',[_c('a',{staticClass:"dropdown-item",attrs:{"href":"/contents/components/MapControls.html"}},[_v("MapControls")])]),_v(" "),_c('li',[_c('a',{staticClass:"dropdown-item",attrs:{"href":"/contents/components/LayerSelect.html"}},[_v("LayerSelect")])]),_v(" "),_c('li',[_c('a',{staticClass:"dropdown-item",attrs:{"href":"/contents/components/VesselLayer.html"}},[_v("VesselLayer")])]),_v(" "),_c('li',[_c('a',{staticClass:"dropdown-item",attrs:{"href":"/contents/components/TerminalLayer.html"}},[_v("TerminalLayer")])]),_v(" "),_c('li',[_c('a',{staticClass:"dropdown-item",attrs:{"href":"/contents/components/Searchbar.html"}},[_v("Searchbar")])]),_v(" "),_c('dropdown-divider'),_v(" "),_c('pre',[_c('code',{pre:true},[_v("  <dropdown-header>Vessel Components</dropdown-header>\n  <li><a href=\"/contents/components/vessel.html\" class=\"dropdown-item\">Vessel Overview</a></li>\n  <li><a href=\"/contents/components/VesselInfoPanel.html\" class=\"dropdown-item\">VesselInfoPanel</a></li>\n  <li><a href=\"/contents/components/VesselInformationPanel.html\" class=\"dropdown-item\">VesselInformationPanel</a></li>\n  <li><a href=\"/contents/components/VesselInformationFloatingActionButton.html\" class=\"dropdown-item\">VesselInformationFloatingActionButton</a></li>\n  <li><a href=\"/contents/components/VesselActivityTable.html\" class=\"dropdown-item\">VesselActivityTable</a></li>\n  <li><a href=\"/contents/components/VesselActivitySingle.html\" class=\"dropdown-item\">VesselActivitySingle</a></li>\n  <li><a href=\"/contents/components/VesselActivitySingleWithArrow.html\" class=\"dropdown-item\">VesselActivitySingleWithArrow</a></li>\n  <dropdown-divider></dropdown-divider>\n  \n  <dropdown-header>Port Components</dropdown-header>\n  <li><a href=\"/contents/components/port.html\" class=\"dropdown-item\">Port Overview</a></li>\n  <li><a href=\"/contents/components/PortServiceTable.html\" class=\"dropdown-item\">PortServiceTable</a></li>\n  <dropdown-divider></dropdown-divider>\n  \n  <dropdown-header>Utility Components</dropdown-header>\n  <li><a href=\"/contents/components/DatePicker.html\" class=\"dropdown-item\">DatePicker</a></li>\n  <li><a href=\"/contents/components/TimeSlider.html\" class=\"dropdown-item\">TimeSlider</a></li>\n  <li><a href=\"/contents/components/Alert.html\" class=\"dropdown-item\">Alert</a></li>\n  <li><a href=\"/contents/components/AutoLoginNotification.html\" class=\"dropdown-item\">AutoLoginNotification</a></li>\n</dropdown>\n<li><a href=\"/contents/api.html\" class=\"nav-link\">API</a></li>\n<li><a href=\"/contents/deployment.html\" class=\"nav-link\">Deployment</a></li>\n<li slot=\"right\">\n  <form class=\"navbar-form\">\n    <searchbar :data=\"searchData\" placeholder=\"Search\" :on-hit=\"searchCallback\" menu-align-right></searchbar>\n  </form>\n</li>\n")])])],1)],1)],1),_v(" "),_c('div',{attrs:{"id":"flex-body"}},[_c('overlay-source',{attrs:{"id":"site-nav","tag-name":"nav","to":"site-nav"}},[_c('div',{staticClass:"site-nav-top"},[_c('div',{staticClass:"fw-bold mb-2",staticStyle:{"font-size":"1.25rem"}},[_v("Contents")])]),_v(" "),_c('div',{staticClass:"nav-component slim-scroll"},[_c('site-nav',[_c('overlay-source',{staticClass:"site-nav-list site-nav-list-root",attrs:{"tag-name":"ul","to":"mb-site-nav"}},[_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-0",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/index.html"}},[_v("Home 🏠")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-0",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/contents/getting-started.html"}},[_v("Getting Started")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-0",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/contents/architecture.html"}},[_v("Architecture")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-0",attrs:{"onclick":"handleSiteNavClick(this)"}},[_v("Components \n\n"),_c('div',{staticClass:"site-nav-dropdown-btn-container"},[_c('i',{staticClass:"site-nav-dropdown-btn-icon site-nav-rotate-icon",attrs:{"onclick":"handleSiteNavClick(this.parentNode.parentNode, false); event.stopPropagation();"}},[_c('span',{staticClass:"glyphicon glyphicon-menu-down",attrs:{"aria-hidden":"true"}})])])]),_c('ul',{staticClass:"site-nav-dropdown-container site-nav-dropdown-container-open site-nav-list"},[_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-1",attrs:{"onclick":"handleSiteNavClick(this)"}},[_v("Map Components\n\n"),_c('div',{staticClass:"site-nav-dropdown-btn-container"},[_c('i',{staticClass:"site-nav-dropdown-btn-icon",attrs:{"onclick":"handleSiteNavClick(this.parentNode.parentNode, false); event.stopPropagation();"}},[_c('span',{staticClass:"glyphicon glyphicon-menu-down",attrs:{"aria-hidden":"true"}})])])]),_c('ul',{staticClass:"site-nav-dropdown-container site-nav-list"},[_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/contents/components/map.html"}},[_v("Map")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/contents/components/MapWithSearchbar.html"}},[_v("MapWithSearchbar")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/contents/components/MapControls.html"}},[_v("MapControls")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/contents/components/LayerSelect.html"}},[_v("LayerSelect")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/contents/components/VesselLayer.html"}},[_v("VesselLayer")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/contents/components/TerminalLayer.html"}},[_v("TerminalLayer")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/contents/components/Searchbar.html"}},[_v("Searchbar")])])])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-1",attrs:{"onclick":"handleSiteNavClick(this)"}},[_v("Vessel Components\n\n"),_c('div',{staticClass:"site-nav-dropdown-btn-container"},[_c('i',{staticClass:"site-nav-dropdown-btn-icon",attrs:{"onclick":"handleSiteNavClick(this.parentNode.parentNode, false); event.stopPropagation();"}},[_c('span',{staticClass:"glyphicon glyphicon-menu-down",attrs:{"aria-hidden":"true"}})])])]),_c('ul',{staticClass:"site-nav-dropdown-container site-nav-list"},[_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/contents/components/vessel.html"}},[_v("Vessel Overview")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/contents/components/VesselInfoPanel.html"}},[_v("VesselInfoPanel")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/contents/components/VesselInformationPanel.html"}},[_v("VesselInformationPanel")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/contents/components/VesselInformationFloatingActionButton.html"}},[_v("VesselInformationFloatingActionButton")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/contents/components/VesselActivityTable.html"}},[_v("VesselActivityTable")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/contents/components/VesselActivitySingle.html"}},[_v("VesselActivitySingle")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/contents/components/VesselActivitySingleWithArrow.html"}},[_v("VesselActivitySingleWithArrow")])])])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-1",attrs:{"onclick":"handleSiteNavClick(this)"}},[_v("Port Components\n\n"),_c('div',{staticClass:"site-nav-dropdown-btn-container"},[_c('i',{staticClass:"site-nav-dropdown-btn-icon",attrs:{"onclick":"handleSiteNavClick(this.parentNode.parentNode, false); event.stopPropagation();"}},[_c('span',{staticClass:"glyphicon glyphicon-menu-down",attrs:{"aria-hidden":"true"}})])])]),_c('ul',{staticClass:"site-nav-dropdown-container site-nav-list"},[_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/contents/components/port.html"}},[_v("Port Overview")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/contents/components/PortServiceTable.html"}},[_v("PortServiceTable")])])])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-1",attrs:{"onclick":"handleSiteNavClick(this)"}},[_v("Utility Components\n\n"),_c('div',{staticClass:"site-nav-dropdown-btn-container"},[_c('i',{staticClass:"site-nav-dropdown-btn-icon",attrs:{"onclick":"handleSiteNavClick(this.parentNode.parentNode, false); event.stopPropagation();"}},[_c('span',{staticClass:"glyphicon glyphicon-menu-down",attrs:{"aria-hidden":"true"}})])])]),_c('ul',{staticClass:"site-nav-dropdown-container site-nav-list"},[_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/contents/components/DatePicker.html"}},[_v("DatePicker")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/contents/components/TimeSlider.html"}},[_v("TimeSlider")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/contents/components/Alert.html"}},[_v("Alert")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/contents/components/AutoLoginNotification.html"}},[_v("AutoLoginNotification")])])])])])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-0",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/contents/api.html"}},[_v("API")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-0",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/contents/deployment.html"}},[_v("Deployment")])])])])],1)],1)]),_v(" "),_c('div',{attrs:{"id":"content-wrapper"}},[_c('breadcrumb'),_v(" "),_m(0),_v(" "),_c('p',[_v("A reusable search input component that provides real-time search functionality with autocomplete suggestions.")]),_v(" "),_m(1),_v(" "),_m(2),_v(" "),_c('p',[_v("The Searchbar component provides a user-friendly search interface with autocomplete suggestions. It's designed to be flexible and can be integrated with various data sources for searching vessels, ports, or other entities in the AIS Web Portal.")]),_v(" "),_m(3),_v(" "),_m(4),_m(5),_v(" "),_m(6),_v(" "),_m(7),_v(" "),_m(8),_v(" "),_m(9),_v(" "),_m(10),_v(" "),_m(11),_v(" "),_m(12),_v(" "),_m(13),_m(14),_v(" "),_c('p',[_v("The Searchbar component uses a controlled input pattern and manages its own internal state for the search query and suggestion visibility.")]),_v(" "),_m(15),_m(16),_v(" "),_m(17),_v(" "),_m(18),_v(" "),_c('p',[_v("The component uses Tailwind CSS for styling:")]),_v(" "),_m(19),_m(20),_v(" "),_m(21)],1),_v(" "),_c('overlay-source',{attrs:{"id":"page-nav","tag-name":"nav","to":"page-nav"}},[_c('div',{staticClass:"nav-component slim-scroll"},[_c('overlay-source',{staticClass:"nav nav-pills flex-column my-0 small no-flex-wrap",attrs:{"id":"mb-page-nav","tag-name":"nav","to":"mb-page-nav"}},[_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#searchbar-component"}},[_v("Searchbar Component‎")]),_v(" "),_c('nav',{staticClass:"nav nav-pills flex-column my-0 nested no-flex-wrap"},[_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#overview"}},[_v("Overview‎")]),_v(" "),_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#props"}},[_v("Props‎")]),_v(" "),_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#features"}},[_v("Features‎")]),_v(" "),_c('nav',{staticClass:"nav nav-pills flex-column my-0 nested no-flex-wrap"},[_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#search-input"}},[_v("Search Input‎")]),_v(" "),_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#autocomplete"}},[_v("Autocomplete‎")]),_v(" "),_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#styling"}},[_v("Styling‎")])]),_v(" "),_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#usage"}},[_v("Usage‎")]),_v(" "),_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#implementation-details"}},[_v("Implementation Details‎")]),_v(" "),_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#dependencies"}},[_v("Dependencies‎")]),_v(" "),_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#styling-2"}},[_v("Styling‎")]),_v(" "),_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#performance-considerations"}},[_v("Performance Considerations‎")])])])],1)]),_v(" "),_c('scroll-top-button')],1),_v(" "),_m(22)])}
};
    var pageVueStaticRenderFns = [function anonymous(
) {
with(this){return _c('h1',{attrs:{"id":"searchbar-component"}},[_v("Searchbar Component"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#searchbar-component","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('p',[_c('strong',[_v("File Location")]),_v(": "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("src/components/Searchbar.tsx")])])}
},function anonymous(
) {
with(this){return _c('h2',{attrs:{"id":"overview"}},[_v("Overview"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#overview","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('h2',{attrs:{"id":"props"}},[_v("Props"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#props","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('div',{staticClass:"table-responsive"},[_c('table',{staticClass:"markbind-table table table-bordered table-striped"},[_c('thead',[_c('tr',[_c('th',[_v("Prop")]),_v(" "),_c('th',[_v("Type")]),_v(" "),_c('th',[_v("Default")]),_v(" "),_c('th',[_v("Description")])])]),_v(" "),_c('tbody',[_c('tr',[_c('td',[_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("placeholder")])]),_v(" "),_c('td',[_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("string")])]),_v(" "),_c('td',[_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("\"Search...\"")])]),_v(" "),_c('td',[_v("Placeholder text for the search input")])]),_v(" "),_c('tr',[_c('td',[_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("onSearch")])]),_v(" "),_c('td',[_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("function")])]),_v(" "),_c('td',[_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("undefined")])]),_v(" "),_c('td',[_v("Callback function triggered when a search is submitted")])]),_v(" "),_c('tr',[_c('td',[_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("onSelect")])]),_v(" "),_c('td',[_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("function")])]),_v(" "),_c('td',[_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("undefined")])]),_v(" "),_c('td',[_v("Callback function triggered when a suggestion is selected")])]),_v(" "),_c('tr',[_c('td',[_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("suggestions")])]),_v(" "),_c('td',[_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("array")])]),_v(" "),_c('td',[_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("[]")])]),_v(" "),_c('td',[_v("Array of suggestion items to display")])]),_v(" "),_c('tr',[_c('td',[_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("className")])]),_v(" "),_c('td',[_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("string")])]),_v(" "),_c('td',[_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("\"\"")])]),_v(" "),_c('td',[_v("Additional CSS classes to apply to the component")])]),_v(" "),_c('tr',[_c('td',[_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("autoFocus")])]),_v(" "),_c('td',[_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("boolean")])]),_v(" "),_c('td',[_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("false")])]),_v(" "),_c('td',[_v("Whether the input should be focused on mount")])])])])])}
},function anonymous(
) {
with(this){return _c('h2',{attrs:{"id":"features"}},[_v("Features"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#features","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('h3',{attrs:{"id":"search-input"}},[_v("Search Input"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#search-input","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('ul',[_c('li',[_v("Clean, accessible input field with customizable placeholder")]),_v(" "),_c('li',[_v("Keyboard navigation support")]),_v(" "),_c('li',[_v("Responsive design that works on all device sizes")])])}
},function anonymous(
) {
with(this){return _c('h3',{attrs:{"id":"autocomplete"}},[_v("Autocomplete"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#autocomplete","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('ul',[_c('li',[_v("Real-time suggestions as the user types")]),_v(" "),_c('li',[_v("Keyboard navigation through suggestions")]),_v(" "),_c('li',[_v("Customizable suggestion rendering")]),_v(" "),_c('li',[_v("Debounced search to prevent excessive API calls")])])}
},function anonymous(
) {
with(this){return _c('h3',{attrs:{"id":"styling"}},[_v("Styling"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#styling","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('ul',[_c('li',[_v("Consistent with the AIS Web Portal design system")]),_v(" "),_c('li',[_v("Customizable through CSS classes")]),_v(" "),_c('li',[_v("Focus and hover states for improved usability")])])}
},function anonymous(
) {
with(this){return _c('h2',{attrs:{"id":"usage"}},[_v("Usage"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#usage","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('pre',[_c('code',{pre:true,attrs:{"class":"hljs tsx"}},[_c('span',[_c('span',{pre:true,attrs:{"class":"hljs-comment"}},[_v("// Basic usage")]),_v("\n")]),_c('span',[_v("<Searchbar\n")]),_c('span',[_v("  placeholder="),_c('span',{pre:true,attrs:{"class":"hljs-string"}},[_v("\"Search vessels...\"")]),_v("\n")]),_c('span',[_v("  onSearch={"),_c('span',{pre:true,attrs:{"class":"hljs-function"}},[_v("("),_c('span',{pre:true,attrs:{"class":"hljs-params"}},[_v("query")]),_v(") =>")]),_v(" fetchVessels(query)}\n")]),_c('span',[_v("/>\n")]),_c('span',[_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"hljs-comment"}},[_v("// With autocomplete suggestions")]),_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"xml"}},[_c('span',{pre:true,attrs:{"class":"hljs-tag"}},[_v("<"),_c('span',{pre:true,attrs:{"class":"hljs-name"}},[_v("Searchbar")])])]),_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"hljs-tag"}},[_c('span',{pre:true,attrs:{"class":"xml"}},[_v("  "),_c('span',{pre:true,attrs:{"class":"hljs-attr"}},[_v("placeholder")]),_v("="),_c('span',{pre:true,attrs:{"class":"hljs-string"}},[_v("\"Search ports...\"")])])]),_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"hljs-tag"}},[_c('span',{pre:true,attrs:{"class":"xml"}},[_v("  "),_c('span',{pre:true,attrs:{"class":"hljs-attr"}},[_v("suggestions")]),_v("="),_c('span',{pre:true,attrs:{"class":"hljs-string"}},[_v("{portSuggestions}")])])]),_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"hljs-tag"}},[_c('span',{pre:true,attrs:{"class":"xml"}},[_v("  "),_c('span',{pre:true,attrs:{"class":"hljs-attr"}},[_v("onSelect")]),_v("="),_c('span',{pre:true,attrs:{"class":"hljs-string"}},[_v("{(port)")]),_v(" =>")]),_v(" selectPort(port)}")]),_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"xml"}},[_v("  onSearch={(query) => fetchPortSuggestions(query)}")]),_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"xml"}},[_v("/>")]),_v("\n")]),_c('span',[_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"hljs-comment"}},[_v("// With custom styling")]),_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"xml"}},[_c('span',{pre:true,attrs:{"class":"hljs-tag"}},[_v("<"),_c('span',{pre:true,attrs:{"class":"hljs-name"}},[_v("Searchbar")])])]),_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"hljs-tag"}},[_c('span',{pre:true,attrs:{"class":"xml"}},[_v("  "),_c('span',{pre:true,attrs:{"class":"hljs-attr"}},[_v("className")]),_v("="),_c('span',{pre:true,attrs:{"class":"hljs-string"}},[_v("\"dark-theme-search\"")])])]),_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"hljs-tag"}},[_c('span',{pre:true,attrs:{"class":"xml"}},[_v("  "),_c('span',{pre:true,attrs:{"class":"hljs-attr"}},[_v("placeholder")]),_v("="),_c('span',{pre:true,attrs:{"class":"hljs-string"}},[_v("\"Search terminals...\"")])])]),_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"hljs-tag"}},[_c('span',{pre:true,attrs:{"class":"xml"}},[_v("  "),_c('span',{pre:true,attrs:{"class":"hljs-attr"}},[_v("onSearch")]),_v("="),_c('span',{pre:true,attrs:{"class":"hljs-string"}},[_v("{handleTerminalSearch}")])])]),_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"hljs-tag"}},[_c('span',{pre:true,attrs:{"class":"xml"}},[_v("/>")])]),_v("\n")])])])}
},function anonymous(
) {
with(this){return _c('h2',{attrs:{"id":"implementation-details"}},[_v("Implementation Details"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#implementation-details","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('pre',[_c('code',{pre:true,attrs:{"class":"hljs typescript"}},[_c('span',[_c('span',{pre:true,attrs:{"class":"hljs-keyword"}},[_v("const")]),_v(" [query, setQuery] = useState("),_c('span',{pre:true,attrs:{"class":"hljs-string"}},[_v("\"\"")]),_v(");\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"hljs-keyword"}},[_v("const")]),_v(" [isFocused, setIsFocused] = useState("),_c('span',{pre:true,attrs:{"class":"hljs-literal"}},[_v("false")]),_v(");\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"hljs-keyword"}},[_v("const")]),_v(" [activeSuggestionIndex, setActiveSuggestionIndex] = useState("),_c('span',{pre:true,attrs:{"class":"hljs-number"}},[_v("0")]),_v(");\n")]),_c('span',[_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"hljs-comment"}},[_v("// Debounced search function to prevent excessive API calls")]),_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"hljs-keyword"}},[_v("const")]),_v(" debouncedSearch = useCallback(\n")]),_c('span',[_v("    debounce("),_c('span',{pre:true,attrs:{"class":"hljs-function"}},[_v("("),_c('span',{pre:true,attrs:{"class":"hljs-params"}},[_v("searchTerm")]),_v(") =>")]),_v(" {\n")]),_c('span',[_v("        "),_c('span',{pre:true,attrs:{"class":"hljs-keyword"}},[_v("if")]),_v(" (onSearch && searchTerm.trim()) {\n")]),_c('span',[_v("            onSearch(searchTerm);\n")]),_c('span',[_v("        }\n")]),_c('span',[_v("    }, "),_c('span',{pre:true,attrs:{"class":"hljs-number"}},[_v("300")]),_v("),\n")]),_c('span',[_v("    [onSearch]\n")]),_c('span',[_v(");\n")]),_c('span',[_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"hljs-comment"}},[_v("// Handle input changes")]),_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"hljs-keyword"}},[_v("const")]),_v(" handleInputChange = "),_c('span',{pre:true,attrs:{"class":"hljs-function"}},[_v("("),_c('span',{pre:true,attrs:{"class":"hljs-params"}},[_v("e: React.ChangeEvent<HTMLInputElement>")]),_v(") =>")]),_v(" {\n")]),_c('span',[_v("    "),_c('span',{pre:true,attrs:{"class":"hljs-keyword"}},[_v("const")]),_v(" value = e.target.value;\n")]),_c('span',[_v("    setQuery(value);\n")]),_c('span',[_v("    debouncedSearch(value);\n")]),_c('span',[_v("};\n")])])])}
},function anonymous(
) {
with(this){return _c('h2',{attrs:{"id":"dependencies"}},[_v("Dependencies"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#dependencies","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('ul',[_c('li',[_v("React for component structure")]),_v(" "),_c('li',[_v("Tailwind CSS for styling")]),_v(" "),_c('li',[_v("Lucide React for search icon")]),_v(" "),_c('li',[_v("Optional integration with search APIs")])])}
},function anonymous(
) {
with(this){return _c('h2',{attrs:{"id":"styling-2"}},[_v("Styling"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#styling-2","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('pre',[_c('code',{pre:true,attrs:{"class":"hljs tsx"}},[_c('span',[_v("<div className={"),_c('span',{pre:true,attrs:{"class":"hljs-string"}},[_v("`relative w-full "),_c('span',{pre:true,attrs:{"class":"hljs-subst"}},[_v("${className}")]),_v("`")]),_v("}>\n")]),_c('span',[_v("    "),_c('span',{pre:true,attrs:{"class":"xml"}},[_c('span',{pre:true,attrs:{"class":"hljs-tag"}},[_v("<"),_c('span',{pre:true,attrs:{"class":"hljs-name"}},[_v("div")]),_v(" "),_c('span',{pre:true,attrs:{"class":"hljs-attr"}},[_v("className")]),_v("="),_c('span',{pre:true,attrs:{"class":"hljs-string"}},[_v("\"relative\"")]),_v(">")])]),_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"xml"}},[_v("        "),_c('span',{pre:true,attrs:{"class":"hljs-tag"}},[_v("<"),_c('span',{pre:true,attrs:{"class":"hljs-name"}},[_v("input")])])]),_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"hljs-tag"}},[_c('span',{pre:true,attrs:{"class":"xml"}},[_v("            "),_c('span',{pre:true,attrs:{"class":"hljs-attr"}},[_v("type")]),_v("="),_c('span',{pre:true,attrs:{"class":"hljs-string"}},[_v("\"text\"")])])]),_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"hljs-tag"}},[_c('span',{pre:true,attrs:{"class":"xml"}},[_v("            "),_c('span',{pre:true,attrs:{"class":"hljs-attr"}},[_v("className")]),_v("="),_c('span',{pre:true,attrs:{"class":"hljs-string"}},[_v("\"w-full px-4 py-2 pr-10 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500\"")])])]),_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"hljs-tag"}},[_c('span',{pre:true,attrs:{"class":"xml"}},[_v("            "),_c('span',{pre:true,attrs:{"class":"hljs-attr"}},[_v("placeholder")]),_v("="),_c('span',{pre:true,attrs:{"class":"hljs-string"}},[_v("{placeholder}")])])]),_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"hljs-tag"}},[_c('span',{pre:true,attrs:{"class":"xml"}},[_v("            "),_c('span',{pre:true,attrs:{"class":"hljs-attr"}},[_v("value")]),_v("="),_c('span',{pre:true,attrs:{"class":"hljs-string"}},[_v("{query}")])])]),_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"hljs-tag"}},[_c('span',{pre:true,attrs:{"class":"xml"}},[_v("            "),_c('span',{pre:true,attrs:{"class":"hljs-attr"}},[_v("onChange")]),_v("="),_c('span',{pre:true,attrs:{"class":"hljs-string"}},[_v("{handleInputChange}")])])]),_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"hljs-tag"}},[_c('span',{pre:true,attrs:{"class":"xml"}},[_v("            "),_c('span',{pre:true,attrs:{"class":"hljs-attr"}},[_v("onFocus")]),_v("="),_c('span',{pre:true,attrs:{"class":"hljs-string"}},[_v("{()")]),_v(" =>")]),_v(" setIsFocused(true)}")]),_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"xml"}},[_v("            onBlur={() => setTimeout(() => setIsFocused(false), 200)}")]),_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"xml"}},[_v("            autoFocus={autoFocus}")]),_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"xml"}},[_v("        />")]),_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"xml"}},[_v("        "),_c('span',{pre:true,attrs:{"class":"hljs-tag"}},[_v("<"),_c('span',{pre:true,attrs:{"class":"hljs-name"}},[_v("div")]),_v(" "),_c('span',{pre:true,attrs:{"class":"hljs-attr"}},[_v("className")]),_v("="),_c('span',{pre:true,attrs:{"class":"hljs-string"}},[_v("\"absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none\"")]),_v(">")])]),_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"xml"}},[_v("            "),_c('span',{pre:true,attrs:{"class":"hljs-tag"}},[_v("<"),_c('span',{pre:true,attrs:{"class":"hljs-name"}},[_v("Search")]),_v(" "),_c('span',{pre:true,attrs:{"class":"hljs-attr"}},[_v("className")]),_v("="),_c('span',{pre:true,attrs:{"class":"hljs-string"}},[_v("\"w-4 h-4 text-gray-400\"")]),_v(" />")])]),_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"xml"}},[_v("        "),_c('span',{pre:true,attrs:{"class":"hljs-tag"}},[_v("</"),_c('span',{pre:true,attrs:{"class":"hljs-name"}},[_v("div")]),_v(">")])]),_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"xml"}},[_v("    "),_c('span',{pre:true,attrs:{"class":"hljs-tag"}},[_v("</"),_c('span',{pre:true,attrs:{"class":"hljs-name"}},[_v("div")]),_v(">")])]),_v("\n")]),_c('span',[_v("\n")]),_c('span',[_v("    {"),_c('span',{pre:true,attrs:{"class":"hljs-comment"}},[_v("/* Suggestions dropdown */")]),_v("}\n")]),_c('span',[_v("    {isFocused && suggestions.length > "),_c('span',{pre:true,attrs:{"class":"hljs-number"}},[_v("0")]),_v(" && (\n")]),_c('span',[_v("        "),_c('span',{pre:true,attrs:{"class":"xml"}},[_c('span',{pre:true,attrs:{"class":"hljs-tag"}},[_v("<"),_c('span',{pre:true,attrs:{"class":"hljs-name"}},[_v("ul")]),_v(" "),_c('span',{pre:true,attrs:{"class":"hljs-attr"}},[_v("className")]),_v("="),_c('span',{pre:true,attrs:{"class":"hljs-string"}},[_v("\"absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto\"")]),_v(">")])]),_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"xml"}},[_v("            {suggestions.map((suggestion, index) => (")]),_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"xml"}},[_v("                "),_c('span',{pre:true,attrs:{"class":"hljs-tag"}},[_v("<"),_c('span',{pre:true,attrs:{"class":"hljs-name"}},[_v("li")])])]),_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"hljs-tag"}},[_c('span',{pre:true,attrs:{"class":"xml"}},[_v("                    "),_c('span',{pre:true,attrs:{"class":"hljs-attr"}},[_v("key")]),_v("="),_c('span',{pre:true,attrs:{"class":"hljs-string"}},[_v("{index}")])])]),_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"hljs-tag"}},[_c('span',{pre:true,attrs:{"class":"xml"}},[_v("                    "),_c('span',{pre:true,attrs:{"class":"hljs-attr"}},[_v("className")]),_v("="),_c('span',{pre:true,attrs:{"class":"hljs-string"}},[_v("{")]),_v("`"),_c('span',{pre:true,attrs:{"class":"hljs-attr"}},[_v("px-4")]),_v(" "),_c('span',{pre:true,attrs:{"class":"hljs-attr"}},[_v("py-2")]),_v(" "),_c('span',{pre:true,attrs:{"class":"hljs-attr"}},[_v("cursor-pointer")]),_v(" "),_c('span',{pre:true,attrs:{"class":"hljs-attr"}},[_v("hover:bg-gray-100")]),_v(" ${")])]),_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"hljs-tag"}},[_c('span',{pre:true,attrs:{"class":"xml"}},[_v("                        "),_c('span',{pre:true,attrs:{"class":"hljs-attr"}},[_v("index")]),_v(" === "),_c('span',{pre:true,attrs:{"class":"hljs-string"}},[_v("activeSuggestionIndex")]),_v(" ? \""),_c('span',{pre:true,attrs:{"class":"hljs-attr"}},[_v("bg-gray-100")]),_v("\" "),_c('span',{pre:true,attrs:{"class":"hljs-attr"}},[_v(":")]),_v(" \"\"")])]),_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"hljs-tag"}},[_c('span',{pre:true,attrs:{"class":"xml"}},[_v("                    }`}")])]),_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"hljs-tag"}},[_c('span',{pre:true,attrs:{"class":"xml"}},[_v("                    "),_c('span',{pre:true,attrs:{"class":"hljs-attr"}},[_v("onClick")]),_v("="),_c('span',{pre:true,attrs:{"class":"hljs-string"}},[_v("{()")]),_v(" =>")]),_v(" handleSuggestionClick(suggestion)}")]),_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"xml"}},[_v("                >")]),_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"xml"}},[_v("                    {renderSuggestion")]),_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"xml"}},[_v("                        ? renderSuggestion(suggestion)")]),_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"xml"}},[_v("                        : suggestion.toString()}")]),_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"xml"}},[_v("                "),_c('span',{pre:true,attrs:{"class":"hljs-tag"}},[_v("</"),_c('span',{pre:true,attrs:{"class":"hljs-name"}},[_v("li")]),_v(">")])]),_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"xml"}},[_v("            ))}")]),_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"xml"}},[_v("        "),_c('span',{pre:true,attrs:{"class":"hljs-tag"}},[_v("</"),_c('span',{pre:true,attrs:{"class":"hljs-name"}},[_v("ul")]),_v(">")])]),_v("\n")]),_c('span',[_v("    )}\n")]),_c('span',[_v("</div>\n")])])])}
},function anonymous(
) {
with(this){return _c('h2',{attrs:{"id":"performance-considerations"}},[_v("Performance Considerations"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#performance-considerations","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('ul',[_c('li',[_v("Uses debouncing to prevent excessive API calls during typing")]),_v(" "),_c('li',[_v("Optimizes rendering with conditional display of suggestions")]),_v(" "),_c('li',[_v("Implements keyboard navigation for better accessibility and usability")])])}
},function anonymous(
) {
with(this){return _c('footer',[_c('div',{staticClass:"text-center"},[_c('small',[_v("AIS Web Portal Documentation | [Generated by "),_c('a',{attrs:{"href":"https://markbind.org/"}},[_v("MarkBind 5.5.3")]),_v("]")])])])}
}];
  