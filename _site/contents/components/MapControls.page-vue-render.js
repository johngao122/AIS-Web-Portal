
    var pageVueRenderFn = function anonymous(
) {
with(this){return _c('div',{attrs:{"id":"app"}},[_c('header',{attrs:{"sticky":""}},[_c('navbar',{attrs:{"type":"dark"},scopedSlots:_u([{key:"brand",fn:function(){return [_c('a',{staticClass:"navbar-brand",attrs:{"href":"/AIS-Web-Portal/index.html","title":"Home"}},[_v("AIS Web Portal")])]},proxy:true}])},[_v(" "),_c('li',[_c('a',{staticClass:"nav-link",attrs:{"href":"/AIS-Web-Portal/index.html"}},[_v("Home")])]),_v(" "),_c('li',[_c('a',{staticClass:"nav-link",attrs:{"href":"/AIS-Web-Portal/contents/getting-started.html"}},[_v("Getting Started")])]),_v(" "),_c('li',[_c('a',{staticClass:"nav-link",attrs:{"href":"/AIS-Web-Portal/contents/architecture.html"}},[_v("Architecture")])]),_v(" "),_c('dropdown',{staticClass:"nav-link",scopedSlots:_u([{key:"header",fn:function(){return [_v("Components")]},proxy:true}])},[_v(" "),_c('dropdown-header',[_v("Map Components")]),_v(" "),_c('li',[_c('a',{staticClass:"dropdown-item",attrs:{"href":"/AIS-Web-Portal/contents/components/map.html"}},[_v("Map")])]),_v(" "),_c('li',[_c('a',{staticClass:"dropdown-item",attrs:{"href":"/AIS-Web-Portal/contents/components/MapWithSearchbar.html"}},[_v("MapWithSearchbar")])]),_v(" "),_c('li',[_c('a',{staticClass:"dropdown-item",attrs:{"href":"/AIS-Web-Portal/contents/components/MapControls.html"}},[_v("MapControls")])]),_v(" "),_c('li',[_c('a',{staticClass:"dropdown-item",attrs:{"href":"/AIS-Web-Portal/contents/components/LayerSelect.html"}},[_v("LayerSelect")])]),_v(" "),_c('li',[_c('a',{staticClass:"dropdown-item",attrs:{"href":"/AIS-Web-Portal/contents/components/VesselLayer.html"}},[_v("VesselLayer")])]),_v(" "),_c('li',[_c('a',{staticClass:"dropdown-item",attrs:{"href":"/AIS-Web-Portal/contents/components/TerminalLayer.html"}},[_v("TerminalLayer")])]),_v(" "),_c('li',[_c('a',{staticClass:"dropdown-item",attrs:{"href":"/AIS-Web-Portal/contents/components/Searchbar.html"}},[_v("Searchbar")])]),_v(" "),_c('dropdown-divider'),_v(" "),_c('pre',[_c('code',{pre:true},[_v("  <dropdown-header>Vessel Components</dropdown-header>\n  <li><a href=\"/AIS-Web-Portal/contents/components/vessel.html\" class=\"dropdown-item\">Vessel Overview</a></li>\n  <li><a href=\"/AIS-Web-Portal/contents/components/VesselInfoPanel.html\" class=\"dropdown-item\">VesselInfoPanel</a></li>\n  <li><a href=\"/AIS-Web-Portal/contents/components/VesselInformationPanel.html\" class=\"dropdown-item\">VesselInformationPanel</a></li>\n  <li><a href=\"/AIS-Web-Portal/contents/components/VesselInformationFloatingActionButton.html\" class=\"dropdown-item\">VesselInformationFloatingActionButton</a></li>\n  <li><a href=\"/AIS-Web-Portal/contents/components/VesselActivityTable.html\" class=\"dropdown-item\">VesselActivityTable</a></li>\n  <li><a href=\"/AIS-Web-Portal/contents/components/VesselActivitySingle.html\" class=\"dropdown-item\">VesselActivitySingle</a></li>\n  <li><a href=\"/AIS-Web-Portal/contents/components/VesselActivitySingleWithArrow.html\" class=\"dropdown-item\">VesselActivitySingleWithArrow</a></li>\n  <dropdown-divider></dropdown-divider>\n  \n  <dropdown-header>Port Components</dropdown-header>\n  <li><a href=\"/AIS-Web-Portal/contents/components/port.html\" class=\"dropdown-item\">Port Overview</a></li>\n  <li><a href=\"/AIS-Web-Portal/contents/components/PortServiceTable.html\" class=\"dropdown-item\">PortServiceTable</a></li>\n  <dropdown-divider></dropdown-divider>\n  \n  <dropdown-header>Utility Components</dropdown-header>\n  <li><a href=\"/AIS-Web-Portal/contents/components/DatePicker.html\" class=\"dropdown-item\">DatePicker</a></li>\n  <li><a href=\"/AIS-Web-Portal/contents/components/TimeSlider.html\" class=\"dropdown-item\">TimeSlider</a></li>\n  <li><a href=\"/AIS-Web-Portal/contents/components/Alert.html\" class=\"dropdown-item\">Alert</a></li>\n  <li><a href=\"/AIS-Web-Portal/contents/components/AutoLoginNotification.html\" class=\"dropdown-item\">AutoLoginNotification</a></li>\n</dropdown>\n<li><a href=\"/AIS-Web-Portal/contents/api.html\" class=\"nav-link\">API</a></li>\n<li><a href=\"/AIS-Web-Portal/contents/deployment.html\" class=\"nav-link\">Deployment</a></li>\n<li slot=\"right\">\n  <form class=\"navbar-form\">\n    <searchbar :data=\"searchData\" placeholder=\"Search\" :on-hit=\"searchCallback\" menu-align-right></searchbar>\n  </form>\n</li>\n")])])],1)],1)],1),_v(" "),_c('div',{attrs:{"id":"flex-body"}},[_c('overlay-source',{attrs:{"id":"site-nav","tag-name":"nav","to":"site-nav"}},[_c('div',{staticClass:"site-nav-top"},[_c('div',{staticClass:"fw-bold mb-2",staticStyle:{"font-size":"1.25rem"}},[_v("Contents")])]),_v(" "),_c('div',{staticClass:"nav-component slim-scroll"},[_c('site-nav',[_c('overlay-source',{staticClass:"site-nav-list site-nav-list-root",attrs:{"tag-name":"ul","to":"mb-site-nav"}},[_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-0",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/AIS-Web-Portal/index.html"}},[_v("Home 🏠")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-0",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/AIS-Web-Portal/contents/getting-started.html"}},[_v("Getting Started")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-0",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/AIS-Web-Portal/contents/architecture.html"}},[_v("Architecture")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-0",attrs:{"onclick":"handleSiteNavClick(this)"}},[_v("Components \n\n"),_c('div',{staticClass:"site-nav-dropdown-btn-container"},[_c('i',{staticClass:"site-nav-dropdown-btn-icon site-nav-rotate-icon",attrs:{"onclick":"handleSiteNavClick(this.parentNode.parentNode, false); event.stopPropagation();"}},[_c('span',{staticClass:"glyphicon glyphicon-menu-down",attrs:{"aria-hidden":"true"}})])])]),_c('ul',{staticClass:"site-nav-dropdown-container site-nav-dropdown-container-open site-nav-list"},[_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-1",attrs:{"onclick":"handleSiteNavClick(this)"}},[_v("Map Components\n\n"),_c('div',{staticClass:"site-nav-dropdown-btn-container"},[_c('i',{staticClass:"site-nav-dropdown-btn-icon",attrs:{"onclick":"handleSiteNavClick(this.parentNode.parentNode, false); event.stopPropagation();"}},[_c('span',{staticClass:"glyphicon glyphicon-menu-down",attrs:{"aria-hidden":"true"}})])])]),_c('ul',{staticClass:"site-nav-dropdown-container site-nav-list"},[_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/AIS-Web-Portal/contents/components/map.html"}},[_v("Map")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/AIS-Web-Portal/contents/components/MapWithSearchbar.html"}},[_v("MapWithSearchbar")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/AIS-Web-Portal/contents/components/MapControls.html"}},[_v("MapControls")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/AIS-Web-Portal/contents/components/LayerSelect.html"}},[_v("LayerSelect")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/AIS-Web-Portal/contents/components/VesselLayer.html"}},[_v("VesselLayer")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/AIS-Web-Portal/contents/components/TerminalLayer.html"}},[_v("TerminalLayer")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/AIS-Web-Portal/contents/components/Searchbar.html"}},[_v("Searchbar")])])])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-1",attrs:{"onclick":"handleSiteNavClick(this)"}},[_v("Vessel Components\n\n"),_c('div',{staticClass:"site-nav-dropdown-btn-container"},[_c('i',{staticClass:"site-nav-dropdown-btn-icon",attrs:{"onclick":"handleSiteNavClick(this.parentNode.parentNode, false); event.stopPropagation();"}},[_c('span',{staticClass:"glyphicon glyphicon-menu-down",attrs:{"aria-hidden":"true"}})])])]),_c('ul',{staticClass:"site-nav-dropdown-container site-nav-list"},[_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/AIS-Web-Portal/contents/components/vessel.html"}},[_v("Vessel Overview")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/AIS-Web-Portal/contents/components/VesselInfoPanel.html"}},[_v("VesselInfoPanel")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/AIS-Web-Portal/contents/components/VesselInformationPanel.html"}},[_v("VesselInformationPanel")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/AIS-Web-Portal/contents/components/VesselInformationFloatingActionButton.html"}},[_v("VesselInformationFloatingActionButton")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/AIS-Web-Portal/contents/components/VesselActivityTable.html"}},[_v("VesselActivityTable")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/AIS-Web-Portal/contents/components/VesselActivitySingle.html"}},[_v("VesselActivitySingle")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/AIS-Web-Portal/contents/components/VesselActivitySingleWithArrow.html"}},[_v("VesselActivitySingleWithArrow")])])])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-1",attrs:{"onclick":"handleSiteNavClick(this)"}},[_v("Port Components\n\n"),_c('div',{staticClass:"site-nav-dropdown-btn-container"},[_c('i',{staticClass:"site-nav-dropdown-btn-icon",attrs:{"onclick":"handleSiteNavClick(this.parentNode.parentNode, false); event.stopPropagation();"}},[_c('span',{staticClass:"glyphicon glyphicon-menu-down",attrs:{"aria-hidden":"true"}})])])]),_c('ul',{staticClass:"site-nav-dropdown-container site-nav-list"},[_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/AIS-Web-Portal/contents/components/port.html"}},[_v("Port Overview")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/AIS-Web-Portal/contents/components/PortServiceTable.html"}},[_v("PortServiceTable")])])])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-1",attrs:{"onclick":"handleSiteNavClick(this)"}},[_v("Utility Components\n\n"),_c('div',{staticClass:"site-nav-dropdown-btn-container"},[_c('i',{staticClass:"site-nav-dropdown-btn-icon",attrs:{"onclick":"handleSiteNavClick(this.parentNode.parentNode, false); event.stopPropagation();"}},[_c('span',{staticClass:"glyphicon glyphicon-menu-down",attrs:{"aria-hidden":"true"}})])])]),_c('ul',{staticClass:"site-nav-dropdown-container site-nav-list"},[_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/AIS-Web-Portal/contents/components/DatePicker.html"}},[_v("DatePicker")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/AIS-Web-Portal/contents/components/TimeSlider.html"}},[_v("TimeSlider")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/AIS-Web-Portal/contents/components/Alert.html"}},[_v("Alert")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/AIS-Web-Portal/contents/components/AutoLoginNotification.html"}},[_v("AutoLoginNotification")])])])])])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-0",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/AIS-Web-Portal/contents/api.html"}},[_v("API")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-0",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/AIS-Web-Portal/contents/deployment.html"}},[_v("Deployment")])])])])],1)],1)]),_v(" "),_c('div',{attrs:{"id":"content-wrapper"}},[_c('breadcrumb'),_v(" "),_m(0),_v(" "),_c('p',[_v("A control panel component that provides zoom controls and layer visibility toggles for the map interface.")]),_v(" "),_m(1),_v(" "),_m(2),_v(" "),_c('p',[_v("The MapControls component offers a user-friendly interface for controlling map interactions and layer visibility. It includes zoom controls and a collapsible panel for managing different map layers like anchorages, fairways, separation schemes, and terminals.")]),_v(" "),_m(3),_v(" "),_m(4),_m(5),_v(" "),_m(6),_m(7),_v(" "),_m(8),_v(" "),_m(9),_v(" "),_m(10),_v(" "),_m(11),_v(" "),_m(12),_v(" "),_m(13),_m(14),_v(" "),_m(15),_v(" "),_m(16)],1),_v(" "),_c('overlay-source',{attrs:{"id":"page-nav","tag-name":"nav","to":"page-nav"}},[_c('div',{staticClass:"nav-component slim-scroll"},[_c('overlay-source',{staticClass:"nav nav-pills flex-column my-0 small no-flex-wrap",attrs:{"id":"mb-page-nav","tag-name":"nav","to":"mb-page-nav"}},[_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#mapcontrols-component"}},[_v("MapControls Component‎")]),_v(" "),_c('nav',{staticClass:"nav nav-pills flex-column my-0 nested no-flex-wrap"},[_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#overview"}},[_v("Overview‎")]),_v(" "),_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#props"}},[_v("Props‎")]),_v(" "),_c('nav',{staticClass:"nav nav-pills flex-column my-0 nested no-flex-wrap"},[_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#activelayers-object-structure"}},[_v("ActiveLayers Object Structure‎")])]),_v(" "),_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#features"}},[_v("Features‎")]),_v(" "),_c('nav',{staticClass:"nav nav-pills flex-column my-0 nested no-flex-wrap"},[_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#zoom-controls"}},[_v("Zoom Controls‎")]),_v(" "),_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#layer-control-panel"}},[_v("Layer Control Panel‎")])]),_v(" "),_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#usage"}},[_v("Usage‎")]),_v(" "),_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#implementation-details"}},[_v("Implementation Details‎")]),_v(" "),_c('nav',{staticClass:"nav nav-pills flex-column my-0 nested no-flex-wrap"},[_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#layer-configuration"}},[_v("Layer Configuration‎")])])])])],1)]),_v(" "),_c('scroll-top-button')],1),_v(" "),_m(17)])}
};
    var pageVueStaticRenderFns = [function anonymous(
) {
with(this){return _c('h1',{attrs:{"id":"mapcontrols-component"}},[_v("MapControls Component"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#mapcontrols-component","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('p',[_c('strong',[_v("File Location")]),_v(": "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("src/components/MapControls.tsx")])])}
},function anonymous(
) {
with(this){return _c('h2',{attrs:{"id":"overview"}},[_v("Overview"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#overview","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('h2',{attrs:{"id":"props"}},[_v("Props"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#props","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('div',{staticClass:"table-responsive"},[_c('table',{staticClass:"markbind-table table table-bordered table-striped"},[_c('thead',[_c('tr',[_c('th',[_v("Prop")]),_v(" "),_c('th',[_v("Type")]),_v(" "),_c('th',[_v("Required")]),_v(" "),_c('th',[_v("Description")])])]),_v(" "),_c('tbody',[_c('tr',[_c('td',[_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("className")])]),_v(" "),_c('td',[_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("string")])]),_v(" "),_c('td',[_v("No")]),_v(" "),_c('td',[_v("Optional CSS class name for additional styling")])]),_v(" "),_c('tr',[_c('td',[_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("activeLayers")])]),_v(" "),_c('td',[_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("object")])]),_v(" "),_c('td',[_v("Yes")]),_v(" "),_c('td',[_v("Object containing visibility state of each map layer")])]),_v(" "),_c('tr',[_c('td',[_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("setActiveLayers")])]),_v(" "),_c('td',[_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("function")])]),_v(" "),_c('td',[_v("Yes")]),_v(" "),_c('td',[_v("State setter function for updating layer visibility")])]),_v(" "),_c('tr',[_c('td',[_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("onZoomIn")])]),_v(" "),_c('td',[_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("function")])]),_v(" "),_c('td',[_v("Yes")]),_v(" "),_c('td',[_v("Callback function for zoom in button click")])]),_v(" "),_c('tr',[_c('td',[_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("onZoomOut")])]),_v(" "),_c('td',[_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("function")])]),_v(" "),_c('td',[_v("Yes")]),_v(" "),_c('td',[_v("Callback function for zoom out button click")])]),_v(" "),_c('tr',[_c('td',[_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("isOpen")])]),_v(" "),_c('td',[_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("boolean")])]),_v(" "),_c('td',[_v("Yes")]),_v(" "),_c('td',[_v("Whether the layer control panel is open")])]),_v(" "),_c('tr',[_c('td',[_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("setIsOpen")])]),_v(" "),_c('td',[_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("function")])]),_v(" "),_c('td',[_v("Yes")]),_v(" "),_c('td',[_v("State setter function for toggling the layer control panel")])])])])])}
},function anonymous(
) {
with(this){return _c('h3',{attrs:{"id":"activelayers-object-structure"}},[_v("ActiveLayers Object Structure"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#activelayers-object-structure","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('pre',[_c('code',{pre:true,attrs:{"class":"hljs typescript"}},[_c('span',[_v("{\n")]),_c('span',[_v("    "),_c('span',{pre:true,attrs:{"class":"hljs-attr"}},[_v("anchorages")]),_v(": "),_c('span',{pre:true,attrs:{"class":"hljs-built_in"}},[_v("boolean")]),_v(";\n")]),_c('span',[_v("    fairways: "),_c('span',{pre:true,attrs:{"class":"hljs-built_in"}},[_v("boolean")]),_v(";\n")]),_c('span',[_v("    separation: "),_c('span',{pre:true,attrs:{"class":"hljs-built_in"}},[_v("boolean")]),_v(";\n")]),_c('span',[_v("    terminals: "),_c('span',{pre:true,attrs:{"class":"hljs-built_in"}},[_v("boolean")]),_v(";\n")]),_c('span',[_v("}\n")])])])}
},function anonymous(
) {
with(this){return _c('h2',{attrs:{"id":"features"}},[_v("Features"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#features","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('h3',{attrs:{"id":"zoom-controls"}},[_v("Zoom Controls"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#zoom-controls","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('ul',[_c('li',[_v("Zoom in button with + icon")]),_v(" "),_c('li',[_v("Zoom out button with - icon")]),_v(" "),_c('li',[_v("Smooth hover transitions")]),_v(" "),_c('li',[_v("Accessible button labels")])])}
},function anonymous(
) {
with(this){return _c('h3',{attrs:{"id":"layer-control-panel"}},[_v("Layer Control Panel"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#layer-control-panel","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('ul',[_c('li',[_v("Collapsible panel interface")]),_v(" "),_c('li',[_v("Layer visibility toggles with checkboxes")]),_v(" "),_c('li',[_v("Visual icons for each layer type")]),_v(" "),_c('li',[_v("Tooltip when panel is collapsed")]),_v(" "),_c('li',[_v("Close button for dismissing panel")])])}
},function anonymous(
) {
with(this){return _c('h2',{attrs:{"id":"usage"}},[_v("Usage"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#usage","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('pre',[_c('code',{pre:true,attrs:{"class":"hljs tsx"}},[_c('span',[_v("<MapControls\n")]),_c('span',[_v("    activeLayers={activeLayers}\n")]),_c('span',[_v("    setActiveLayers={setActiveLayers}\n")]),_c('span',[_v("    onZoomIn={"),_c('span',{pre:true,attrs:{"class":"hljs-function"}},[_v("() =>")]),_v(" handleZoomIn()}\n")]),_c('span',[_v("    onZoomOut={"),_c('span',{pre:true,attrs:{"class":"hljs-function"}},[_v("() =>")]),_v(" handleZoomOut()}\n")]),_c('span',[_v("    isOpen={isLayerPanelOpen}\n")]),_c('span',[_v("    setIsOpen={setLayerPanelOpen}\n")]),_c('span',[_v("/>\n")])])])}
},function anonymous(
) {
with(this){return _c('h2',{attrs:{"id":"implementation-details"}},[_v("Implementation Details"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#implementation-details","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('h3',{attrs:{"id":"layer-configuration"}},[_v("Layer Configuration"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#layer-configuration","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('pre',[_c('code',{pre:true,attrs:{"class":"hljs"}},[_c('span',[_v("\n")])])])}
},function anonymous(
) {
with(this){return _c('footer',[_c('div',{staticClass:"text-center"},[_c('small',[_v("AIS Web Portal Documentation | [Generated by "),_c('a',{attrs:{"href":"https://markbind.org/"}},[_v("MarkBind 5.5.3")]),_v("]")])])])}
}];
  