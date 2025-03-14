
    var pageVueRenderFn = function anonymous(
) {
with(this){return _c('div',{attrs:{"id":"app"}},[_c('header',{attrs:{"sticky":""}},[_c('navbar',{attrs:{"type":"dark"},scopedSlots:_u([{key:"brand",fn:function(){return [_c('a',{staticClass:"navbar-brand",attrs:{"href":"/index.html","title":"Home"}},[_v("AIS Web Portal")])]},proxy:true}])},[_v(" "),_c('li',[_c('a',{staticClass:"nav-link",attrs:{"href":"/index.html"}},[_v("Home")])]),_v(" "),_c('li',[_c('a',{staticClass:"nav-link",attrs:{"href":"/contents/getting-started.html"}},[_v("Getting Started")])]),_v(" "),_c('li',[_c('a',{staticClass:"nav-link",attrs:{"href":"/contents/architecture.html"}},[_v("Architecture")])]),_v(" "),_c('dropdown',{staticClass:"nav-link",scopedSlots:_u([{key:"header",fn:function(){return [_v("Components")]},proxy:true}])},[_v(" "),_c('dropdown-header',[_v("Map Components")]),_v(" "),_c('li',[_c('a',{staticClass:"dropdown-item",attrs:{"href":"/contents/components/map.html"}},[_v("Map")])]),_v(" "),_c('li',[_c('a',{staticClass:"dropdown-item",attrs:{"href":"/contents/components/MapWithSearchbar.html"}},[_v("MapWithSearchbar")])]),_v(" "),_c('li',[_c('a',{staticClass:"dropdown-item",attrs:{"href":"/contents/components/MapControls.html"}},[_v("MapControls")])]),_v(" "),_c('li',[_c('a',{staticClass:"dropdown-item",attrs:{"href":"/contents/components/LayerSelect.html"}},[_v("LayerSelect")])]),_v(" "),_c('li',[_c('a',{staticClass:"dropdown-item",attrs:{"href":"/contents/components/VesselLayer.html"}},[_v("VesselLayer")])]),_v(" "),_c('li',[_c('a',{staticClass:"dropdown-item",attrs:{"href":"/contents/components/TerminalLayer.html"}},[_v("TerminalLayer")])]),_v(" "),_c('li',[_c('a',{staticClass:"dropdown-item",attrs:{"href":"/contents/components/Searchbar.html"}},[_v("Searchbar")])]),_v(" "),_c('dropdown-divider'),_v(" "),_c('pre',[_c('code',{pre:true},[_v("  <dropdown-header>Vessel Components</dropdown-header>\n  <li><a href=\"/contents/components/vessel.html\" class=\"dropdown-item\">Vessel Overview</a></li>\n  <li><a href=\"/contents/components/VesselInfoPanel.html\" class=\"dropdown-item\">VesselInfoPanel</a></li>\n  <li><a href=\"/contents/components/VesselInformationPanel.html\" class=\"dropdown-item\">VesselInformationPanel</a></li>\n  <li><a href=\"/contents/components/VesselInformationFloatingActionButton.html\" class=\"dropdown-item\">VesselInformationFloatingActionButton</a></li>\n  <li><a href=\"/contents/components/VesselActivityTable.html\" class=\"dropdown-item\">VesselActivityTable</a></li>\n  <li><a href=\"/contents/components/VesselActivitySingle.html\" class=\"dropdown-item\">VesselActivitySingle</a></li>\n  <li><a href=\"/contents/components/VesselActivitySingleWithArrow.html\" class=\"dropdown-item\">VesselActivitySingleWithArrow</a></li>\n  <dropdown-divider></dropdown-divider>\n  \n  <dropdown-header>Port Components</dropdown-header>\n  <li><a href=\"/contents/components/port.html\" class=\"dropdown-item\">Port Overview</a></li>\n  <li><a href=\"/contents/components/PortServiceTable.html\" class=\"dropdown-item\">PortServiceTable</a></li>\n  <dropdown-divider></dropdown-divider>\n  \n  <dropdown-header>Utility Components</dropdown-header>\n  <li><a href=\"/contents/components/DatePicker.html\" class=\"dropdown-item\">DatePicker</a></li>\n  <li><a href=\"/contents/components/TimeSlider.html\" class=\"dropdown-item\">TimeSlider</a></li>\n  <li><a href=\"/contents/components/Alert.html\" class=\"dropdown-item\">Alert</a></li>\n  <li><a href=\"/contents/components/AutoLoginNotification.html\" class=\"dropdown-item\">AutoLoginNotification</a></li>\n</dropdown>\n<li><a href=\"/contents/api.html\" class=\"nav-link\">API</a></li>\n<li><a href=\"/contents/deployment.html\" class=\"nav-link\">Deployment</a></li>\n<li slot=\"right\">\n  <form class=\"navbar-form\">\n    <searchbar :data=\"searchData\" placeholder=\"Search\" :on-hit=\"searchCallback\" menu-align-right></searchbar>\n  </form>\n</li>\n")])])],1)],1)],1),_v(" "),_c('div',{attrs:{"id":"flex-body"}},[_c('overlay-source',{attrs:{"id":"site-nav","tag-name":"nav","to":"site-nav"}},[_c('div',{staticClass:"site-nav-top"},[_c('div',{staticClass:"fw-bold mb-2",staticStyle:{"font-size":"1.25rem"}},[_v("Contents")])]),_v(" "),_c('div',{staticClass:"nav-component slim-scroll"},[_c('site-nav',[_c('overlay-source',{staticClass:"site-nav-list site-nav-list-root",attrs:{"tag-name":"ul","to":"mb-site-nav"}},[_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-0",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/index.html"}},[_v("Home 🏠")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-0",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/contents/getting-started.html"}},[_v("Getting Started")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-0",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/contents/architecture.html"}},[_v("Architecture")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-0",attrs:{"onclick":"handleSiteNavClick(this)"}},[_v("Components \n\n"),_c('div',{staticClass:"site-nav-dropdown-btn-container"},[_c('i',{staticClass:"site-nav-dropdown-btn-icon site-nav-rotate-icon",attrs:{"onclick":"handleSiteNavClick(this.parentNode.parentNode, false); event.stopPropagation();"}},[_c('span',{staticClass:"glyphicon glyphicon-menu-down",attrs:{"aria-hidden":"true"}})])])]),_c('ul',{staticClass:"site-nav-dropdown-container site-nav-dropdown-container-open site-nav-list"},[_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-1",attrs:{"onclick":"handleSiteNavClick(this)"}},[_v("Map Components\n\n"),_c('div',{staticClass:"site-nav-dropdown-btn-container"},[_c('i',{staticClass:"site-nav-dropdown-btn-icon",attrs:{"onclick":"handleSiteNavClick(this.parentNode.parentNode, false); event.stopPropagation();"}},[_c('span',{staticClass:"glyphicon glyphicon-menu-down",attrs:{"aria-hidden":"true"}})])])]),_c('ul',{staticClass:"site-nav-dropdown-container site-nav-list"},[_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/contents/components/map.html"}},[_v("Map")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/contents/components/MapWithSearchbar.html"}},[_v("MapWithSearchbar")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/contents/components/MapControls.html"}},[_v("MapControls")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/contents/components/LayerSelect.html"}},[_v("LayerSelect")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/contents/components/VesselLayer.html"}},[_v("VesselLayer")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/contents/components/TerminalLayer.html"}},[_v("TerminalLayer")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/contents/components/Searchbar.html"}},[_v("Searchbar")])])])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-1",attrs:{"onclick":"handleSiteNavClick(this)"}},[_v("Vessel Components\n\n"),_c('div',{staticClass:"site-nav-dropdown-btn-container"},[_c('i',{staticClass:"site-nav-dropdown-btn-icon",attrs:{"onclick":"handleSiteNavClick(this.parentNode.parentNode, false); event.stopPropagation();"}},[_c('span',{staticClass:"glyphicon glyphicon-menu-down",attrs:{"aria-hidden":"true"}})])])]),_c('ul',{staticClass:"site-nav-dropdown-container site-nav-list"},[_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/contents/components/vessel.html"}},[_v("Vessel Overview")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/contents/components/VesselInfoPanel.html"}},[_v("VesselInfoPanel")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/contents/components/VesselInformationPanel.html"}},[_v("VesselInformationPanel")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/contents/components/VesselInformationFloatingActionButton.html"}},[_v("VesselInformationFloatingActionButton")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/contents/components/VesselActivityTable.html"}},[_v("VesselActivityTable")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/contents/components/VesselActivitySingle.html"}},[_v("VesselActivitySingle")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/contents/components/VesselActivitySingleWithArrow.html"}},[_v("VesselActivitySingleWithArrow")])])])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-1",attrs:{"onclick":"handleSiteNavClick(this)"}},[_v("Port Components\n\n"),_c('div',{staticClass:"site-nav-dropdown-btn-container"},[_c('i',{staticClass:"site-nav-dropdown-btn-icon",attrs:{"onclick":"handleSiteNavClick(this.parentNode.parentNode, false); event.stopPropagation();"}},[_c('span',{staticClass:"glyphicon glyphicon-menu-down",attrs:{"aria-hidden":"true"}})])])]),_c('ul',{staticClass:"site-nav-dropdown-container site-nav-list"},[_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/contents/components/port.html"}},[_v("Port Overview")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/contents/components/PortServiceTable.html"}},[_v("PortServiceTable")])])])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-1",attrs:{"onclick":"handleSiteNavClick(this)"}},[_v("Utility Components\n\n"),_c('div',{staticClass:"site-nav-dropdown-btn-container"},[_c('i',{staticClass:"site-nav-dropdown-btn-icon",attrs:{"onclick":"handleSiteNavClick(this.parentNode.parentNode, false); event.stopPropagation();"}},[_c('span',{staticClass:"glyphicon glyphicon-menu-down",attrs:{"aria-hidden":"true"}})])])]),_c('ul',{staticClass:"site-nav-dropdown-container site-nav-list"},[_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/contents/components/DatePicker.html"}},[_v("DatePicker")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/contents/components/TimeSlider.html"}},[_v("TimeSlider")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/contents/components/Alert.html"}},[_v("Alert")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-2",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/contents/components/AutoLoginNotification.html"}},[_v("AutoLoginNotification")])])])])])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-0",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/contents/api.html"}},[_v("API")])])]),_v(" "),_c('li',[_c('div',{staticClass:"site-nav-default-list-item site-nav-list-item-0",attrs:{"onclick":"handleSiteNavClick(this)"}},[_c('a',{attrs:{"href":"/contents/deployment.html"}},[_v("Deployment")])])])])],1)],1)]),_v(" "),_c('div',{attrs:{"id":"content-wrapper"}},[_c('breadcrumb'),_v(" "),_m(0),_v(" "),_c('p',[_v("The port service components provide tools for analyzing and visualizing port performance metrics, terminal operations, and vessel activities within ports.")]),_v(" "),_m(1),_v(" "),_c('p',[_v("These components enable users to monitor port service levels, analyze port efficiency, and track vessel movements within port areas. They provide valuable insights for port operators, shipping companies, and maritime analysts.")]),_v(" "),_m(2),_v(" "),_m(3),_v(" "),_c('p',[_v("A table that displays port service metrics and performance indicators.")]),_v(" "),_m(4),_v(" "),_m(5),_v(" "),_m(6),_v(" "),_m(7),_v(" "),_m(8),_m(9),_v(" "),_m(10),_v(" "),_m(11),_v(" "),_c('p',[_v("A floating action button that provides quick access to port service level analysis.")]),_v(" "),_m(12),_v(" "),_m(13),_v(" "),_m(14),_v(" "),_m(15),_v(" "),_m(16),_m(17),_v(" "),_m(18),_v(" "),_m(19),_v(" "),_c('p',[_v("The port components work with several data structures:")]),_v(" "),_m(20),_v(" "),_m(21),_m(22),_v(" "),_m(23),_m(24),_v(" "),_c('p',[_v("The port components use React's useState and useEffect hooks for state management. Key state variables include:")]),_v(" "),_m(25),_m(26),_v(" "),_c('p',[_v("The port components handle various events for user interaction:")]),_v(" "),_m(27),_m(28),_v(" "),_c('p',[_v("The port components integrate with other parts of the application:")]),_v(" "),_m(29)],1),_v(" "),_c('overlay-source',{attrs:{"id":"page-nav","tag-name":"nav","to":"page-nav"}},[_c('div',{staticClass:"nav-component slim-scroll"},[_c('overlay-source',{staticClass:"nav nav-pills flex-column my-0 small no-flex-wrap",attrs:{"id":"mb-page-nav","tag-name":"nav","to":"mb-page-nav"}},[_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#port-service-components"}},[_v("Port Service Components‎")]),_v(" "),_c('nav',{staticClass:"nav nav-pills flex-column my-0 nested no-flex-wrap"},[_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#overview"}},[_v("Overview‎")]),_v(" "),_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#key-components"}},[_v("Key Components‎")]),_v(" "),_c('nav',{staticClass:"nav nav-pills flex-column my-0 nested no-flex-wrap"},[_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#portservicetable"}},[_v("PortServiceTable‎")]),_v(" "),_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#portservicelevelfloatingactionbutton"}},[_v("PortServiceLevelFloatingActionButton‎")])]),_v(" "),_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#data-structures"}},[_v("Data Structures‎")]),_v(" "),_c('nav',{staticClass:"nav nav-pills flex-column my-0 nested no-flex-wrap"},[_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#portservicedata"}},[_v("PortServiceData‎")]),_v(" "),_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#timerange"}},[_v("TimeRange‎")])]),_v(" "),_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#state-management"}},[_v("State Management‎")]),_v(" "),_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#event-handling"}},[_v("Event Handling‎")]),_v(" "),_c('a',{pre:true,attrs:{"class":"nav-link py-1","href":"#integration-with-other-components"}},[_v("Integration with Other Components‎")])])])],1)]),_v(" "),_c('scroll-top-button')],1),_v(" "),_m(30)])}
};
    var pageVueStaticRenderFns = [function anonymous(
) {
with(this){return _c('h1',{attrs:{"id":"port-service-components"}},[_v("Port Service Components"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#port-service-components","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('h2',{attrs:{"id":"overview"}},[_v("Overview"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#overview","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('h2',{attrs:{"id":"key-components"}},[_v("Key Components"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#key-components","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('h3',{attrs:{"id":"portservicetable"}},[_v("PortServiceTable"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#portservicetable","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('p',[_c('strong',[_v("File Location")]),_v(": "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("src/components/PortServiceTable.tsx")])])}
},function anonymous(
) {
with(this){return _c('p',[_c('strong',[_v("Key Features")]),_v(":")])}
},function anonymous(
) {
with(this){return _c('ul',[_c('li',[_v("Sortable columns for service metrics")]),_v(" "),_c('li',[_v("Filterable data by service type and date")]),_v(" "),_c('li',[_v("Performance indicators visualization")]),_v(" "),_c('li',[_v("Service level statistics")]),_v(" "),_c('li',[_v("Interactive data exploration")])])}
},function anonymous(
) {
with(this){return _c('p',[_c('strong',[_v("Example Usage")]),_v(":")])}
},function anonymous(
) {
with(this){return _c('pre',[_c('code',{pre:true,attrs:{"class":"hljs tsx"}},[_c('span',[_v("<PortServiceTable data={portServiceData} onClose={handleClose} />\n")])])])}
},function anonymous(
) {
with(this){return _c('p',[_c('strong',[_v("Props")]),_v(":")])}
},function anonymous(
) {
with(this){return _c('ul',[_c('li',[_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("data")]),_v(": Array of port service data objects")]),_v(" "),_c('li',[_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("onClose")]),_v(": Function to handle closing the table")])])}
},function anonymous(
) {
with(this){return _c('h3',{attrs:{"id":"portservicelevelfloatingactionbutton"}},[_v("PortServiceLevelFloatingActionButton"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#portservicelevelfloatingactionbutton","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('p',[_c('strong',[_v("File Location")]),_v(": "),_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("src/components/PortServiceLevelFloatingActionButton.tsx")])])}
},function anonymous(
) {
with(this){return _c('p',[_c('strong',[_v("Key Features")]),_v(":")])}
},function anonymous(
) {
with(this){return _c('ul',[_c('li',[_v("Quick access to port service level analysis")]),_v(" "),_c('li',[_v("Toggle between different analysis views")]),_v(" "),_c('li',[_v("Customizable position on the screen")]),_v(" "),_c('li',[_v("Animated transitions between states")]),_v(" "),_c('li',[_v("Time period selection")]),_v(" "),_c('li',[_v("Filtering options for vessel categories and metrics")])])}
},function anonymous(
) {
with(this){return _c('p',[_c('strong',[_v("Example Usage")]),_v(":")])}
},function anonymous(
) {
with(this){return _c('pre',[_c('code',{pre:true,attrs:{"class":"hljs tsx"}},[_c('span',[_v("<PortServiceLevelFloatingActionButton\n")]),_c('span',[_v("    onPortServiceDataUpdate={handlePortServiceDataUpdate}\n")]),_c('span',[_v("    initialTimeRanges={timeRanges}\n")]),_c('span',[_v("    isItExpanded={isExpanded}\n")]),_c('span',[_v("    onClose={handleClose}\n")]),_c('span',[_v("/>\n")])])])}
},function anonymous(
) {
with(this){return _c('p',[_c('strong',[_v("Props")]),_v(":")])}
},function anonymous(
) {
with(this){return _c('ul',[_c('li',[_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("onPortServiceDataUpdate")]),_v(": Function to handle port service data updates")]),_v(" "),_c('li',[_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("initialTimeRanges")]),_v(": Initial time ranges to display")]),_v(" "),_c('li',[_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("isItExpanded")]),_v(": Boolean indicating if the FAB is expanded")]),_v(" "),_c('li',[_c('code',{pre:true,attrs:{"class":"hljs inline no-lang"}},[_v("onClose")]),_v(": Function to handle closing the FAB")])])}
},function anonymous(
) {
with(this){return _c('h2',{attrs:{"id":"data-structures"}},[_v("Data Structures"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#data-structures","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('h3',{attrs:{"id":"portservicedata"}},[_v("PortServiceData"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#portservicedata","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('pre',[_c('code',{pre:true,attrs:{"class":"hljs typescript"}},[_c('span',[_c('span',{pre:true,attrs:{"class":"hljs-keyword"}},[_v("interface")]),_v(" PortServiceData {\n")]),_c('span',[_v("    [periodKey: "),_c('span',{pre:true,attrs:{"class":"hljs-built_in"}},[_v("string")]),_v("]: {\n")]),_c('span',[_v("        "),_c('span',{pre:true,attrs:{"class":"hljs-attr"}},[_v("startDate")]),_v(": "),_c('span',{pre:true,attrs:{"class":"hljs-built_in"}},[_v("string")]),_v(";\n")]),_c('span',[_v("        endDate: "),_c('span',{pre:true,attrs:{"class":"hljs-built_in"}},[_v("string")]),_v(";\n")]),_c('span',[_v("        "),_c('span',{pre:true,attrs:{"class":"hljs-string"}},[_v("\"All vessels\"")]),_v("?: {\n")]),_c('span',[_v("            TotalBerthed?: "),_c('span',{pre:true,attrs:{"class":"hljs-built_in"}},[_v("number")]),_v(";\n")]),_c('span',[_v("            JIT?: "),_c('span',{pre:true,attrs:{"class":"hljs-built_in"}},[_v("number")]),_v(";\n")]),_c('span',[_v("            WaitingHours?: "),_c('span',{pre:true,attrs:{"class":"hljs-built_in"}},[_v("number")]),_v(";\n")]),_c('span',[_v("            BerthingHours?: "),_c('span',{pre:true,attrs:{"class":"hljs-built_in"}},[_v("number")]),_v(";\n")]),_c('span',[_v("            InPortHours?: "),_c('span',{pre:true,attrs:{"class":"hljs-built_in"}},[_v("number")]),_v(";\n")]),_c('span',[_v("            WharfUtilizationRate?: "),_c('span',{pre:true,attrs:{"class":"hljs-built_in"}},[_v("number")]),_v(";\n")]),_c('span',[_v("        };\n")]),_c('span',[_v("        "),_c('span',{pre:true,attrs:{"class":"hljs-string"}},[_v("\"Category 1 vessels\"")]),_v("?: {\n")]),_c('span',[_v("            "),_c('span',{pre:true,attrs:{"class":"hljs-comment"}},[_v("// Same metrics as All vessels")]),_v("\n")]),_c('span',[_v("        };\n")]),_c('span',[_v("        "),_c('span',{pre:true,attrs:{"class":"hljs-string"}},[_v("\"Category 2 vessels\"")]),_v("?: {\n")]),_c('span',[_v("            "),_c('span',{pre:true,attrs:{"class":"hljs-comment"}},[_v("// Same metrics as All vessels")]),_v("\n")]),_c('span',[_v("        };\n")]),_c('span',[_v("        "),_c('span',{pre:true,attrs:{"class":"hljs-string"}},[_v("\"Category 3 vessels\"")]),_v("?: {\n")]),_c('span',[_v("            "),_c('span',{pre:true,attrs:{"class":"hljs-comment"}},[_v("// Same metrics as All vessels")]),_v("\n")]),_c('span',[_v("        };\n")]),_c('span',[_v("        "),_c('span',{pre:true,attrs:{"class":"hljs-string"}},[_v("\"Category 4 vessels\"")]),_v("?: {\n")]),_c('span',[_v("            "),_c('span',{pre:true,attrs:{"class":"hljs-comment"}},[_v("// Same metrics as All vessels")]),_v("\n")]),_c('span',[_v("        };\n")]),_c('span',[_v("    };\n")]),_c('span',[_v("}\n")])])])}
},function anonymous(
) {
with(this){return _c('h3',{attrs:{"id":"timerange"}},[_v("TimeRange"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#timerange","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('pre',[_c('code',{pre:true,attrs:{"class":"hljs typescript"}},[_c('span',[_c('span',{pre:true,attrs:{"class":"hljs-keyword"}},[_v("interface")]),_v(" TimeRange {\n")]),_c('span',[_v("    "),_c('span',{pre:true,attrs:{"class":"hljs-attr"}},[_v("startDate")]),_v(": "),_c('span',{pre:true,attrs:{"class":"hljs-built_in"}},[_v("Date")]),_v(";\n")]),_c('span',[_v("    endDate: "),_c('span',{pre:true,attrs:{"class":"hljs-built_in"}},[_v("Date")]),_v(";\n")]),_c('span',[_v("    label: "),_c('span',{pre:true,attrs:{"class":"hljs-built_in"}},[_v("string")]),_v(";\n")]),_c('span',[_v("}\n")])])])}
},function anonymous(
) {
with(this){return _c('h2',{attrs:{"id":"state-management"}},[_v("State Management"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#state-management","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('pre',[_c('code',{pre:true,attrs:{"class":"hljs typescript"}},[_c('span',[_c('span',{pre:true,attrs:{"class":"hljs-comment"}},[_v("// Port service data")]),_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"hljs-keyword"}},[_v("const")]),_v(" [portServiceData, setPortServiceData] = useState<PortServiceData[]>([]);\n")]),_c('span',[_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"hljs-comment"}},[_v("// Time ranges")]),_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"hljs-keyword"}},[_v("const")]),_v(" [timeRanges, setTimeRanges] = useState<TimeRange[]>([]);\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"hljs-keyword"}},[_v("const")]),_v(" [currentStartDate, setCurrentStartDate] = useState<"),_c('span',{pre:true,attrs:{"class":"hljs-built_in"}},[_v("Date")]),_v(">();\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"hljs-keyword"}},[_v("const")]),_v(" [currentEndDate, setCurrentEndDate] = useState<"),_c('span',{pre:true,attrs:{"class":"hljs-built_in"}},[_v("Date")]),_v(">();\n")]),_c('span',[_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"hljs-comment"}},[_v("// Filtering and UI states")]),_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"hljs-keyword"}},[_v("const")]),_v(" [selectedFilters, setSelectedFilters] = useState<"),_c('span',{pre:true,attrs:{"class":"hljs-built_in"}},[_v("string")]),_v("[]>([]);\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"hljs-keyword"}},[_v("const")]),_v(" [dateError, setDateError] = useState<"),_c('span',{pre:true,attrs:{"class":"hljs-built_in"}},[_v("string")]),_v(">("),_c('span',{pre:true,attrs:{"class":"hljs-string"}},[_v("\"\"")]),_v(");\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"hljs-keyword"}},[_v("const")]),_v(" [isLoading, setIsLoading] = useState<"),_c('span',{pre:true,attrs:{"class":"hljs-built_in"}},[_v("boolean")]),_v(">("),_c('span',{pre:true,attrs:{"class":"hljs-literal"}},[_v("false")]),_v(");\n")])])])}
},function anonymous(
) {
with(this){return _c('h2',{attrs:{"id":"event-handling"}},[_v("Event Handling"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#event-handling","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('pre',[_c('code',{pre:true,attrs:{"class":"hljs typescript"}},[_c('span',[_c('span',{pre:true,attrs:{"class":"hljs-comment"}},[_v("// Handle filtering port data")]),_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"hljs-keyword"}},[_v("const")]),_v(" handleFilterChange = "),_c('span',{pre:true,attrs:{"class":"hljs-function"}},[_v("("),_c('span',{pre:true,attrs:{"class":"hljs-params"}},[_v("newFilter: Partial<PortFilter>")]),_v(") =>")]),_v(" {\n")]),_c('span',[_v("    setFilter({\n")]),_c('span',[_v("        ...filter,\n")]),_c('span',[_v("        ...newFilter,\n")]),_c('span',[_v("    });\n")]),_c('span',[_v("};\n")]),_c('span',[_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"hljs-comment"}},[_v("// Handle time range selection")]),_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"hljs-keyword"}},[_v("const")]),_v(" handleAddTimeRange = "),_c('span',{pre:true,attrs:{"class":"hljs-function"}},[_v("() =>")]),_v(" {\n")]),_c('span',[_v("    "),_c('span',{pre:true,attrs:{"class":"hljs-keyword"}},[_v("if")]),_v(" (!currentStartDate || !currentEndDate || dateError) "),_c('span',{pre:true,attrs:{"class":"hljs-keyword"}},[_v("return")]),_v(";\n")]),_c('span',[_v("    "),_c('span',{pre:true,attrs:{"class":"hljs-keyword"}},[_v("if")]),_v(" (timeRanges.length >= MAX_TIME_PERIODS) "),_c('span',{pre:true,attrs:{"class":"hljs-keyword"}},[_v("return")]),_v(";\n")]),_c('span',[_v("\n")]),_c('span',[_v("    "),_c('span',{pre:true,attrs:{"class":"hljs-keyword"}},[_v("const")]),_v(" label = "),_c('span',{pre:true,attrs:{"class":"hljs-string"}},[_v("`Period "),_c('span',{pre:true,attrs:{"class":"hljs-subst"}},[_v("${timeRanges.length + "),_c('span',{pre:true,attrs:{"class":"hljs-number"}},[_v("1")]),_v("}")]),_v("`")]),_v(";\n")]),_c('span',[_v("    "),_c('span',{pre:true,attrs:{"class":"hljs-keyword"}},[_v("const")]),_v(" newRange = {\n")]),_c('span',[_v("        "),_c('span',{pre:true,attrs:{"class":"hljs-attr"}},[_v("startDate")]),_v(": currentStartDate,\n")]),_c('span',[_v("        "),_c('span',{pre:true,attrs:{"class":"hljs-attr"}},[_v("endDate")]),_v(": currentEndDate,\n")]),_c('span',[_v("        label,\n")]),_c('span',[_v("    };\n")]),_c('span',[_v("\n")]),_c('span',[_v("    setTimeRanges([...timeRanges, newRange]);\n")]),_c('span',[_v("    setCurrentStartDate("),_c('span',{pre:true,attrs:{"class":"hljs-literal"}},[_v("undefined")]),_v(");\n")]),_c('span',[_v("    setCurrentEndDate("),_c('span',{pre:true,attrs:{"class":"hljs-literal"}},[_v("undefined")]),_v(");\n")]),_c('span',[_v("};\n")]),_c('span',[_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"hljs-comment"}},[_v("// Handle data analysis")]),_v("\n")]),_c('span',[_c('span',{pre:true,attrs:{"class":"hljs-keyword"}},[_v("const")]),_v(" handleAnalyze = "),_c('span',{pre:true,attrs:{"class":"hljs-keyword"}},[_v("async")]),_v(" () => {\n")]),_c('span',[_v("    setIsLoading("),_c('span',{pre:true,attrs:{"class":"hljs-literal"}},[_v("true")]),_v(");\n")]),_c('span',[_v("    "),_c('span',{pre:true,attrs:{"class":"hljs-keyword"}},[_v("try")]),_v(" {\n")]),_c('span',[_v("        "),_c('span',{pre:true,attrs:{"class":"hljs-keyword"}},[_v("const")]),_v(" requestBody = timeRanges.map("),_c('span',{pre:true,attrs:{"class":"hljs-function"}},[_v("("),_c('span',{pre:true,attrs:{"class":"hljs-params"}},[_v("range, index")]),_v(") =>")]),_v(" ({\n")]),_c('span',[_v("            "),_c('span',{pre:true,attrs:{"class":"hljs-attr"}},[_v("name")]),_v(": "),_c('span',{pre:true,attrs:{"class":"hljs-string"}},[_v("`Period "),_c('span',{pre:true,attrs:{"class":"hljs-subst"}},[_v("${index + "),_c('span',{pre:true,attrs:{"class":"hljs-number"}},[_v("1")]),_v("}")]),_v("`")]),_v(",\n")]),_c('span',[_v("            "),_c('span',{pre:true,attrs:{"class":"hljs-attr"}},[_v("startDate")]),_v(": range.startDate.toISOString(),\n")]),_c('span',[_v("            "),_c('span',{pre:true,attrs:{"class":"hljs-attr"}},[_v("endDate")]),_v(": range.endDate.toISOString(),\n")]),_c('span',[_v("        }));\n")]),_c('span',[_v("\n")]),_c('span',[_v("        "),_c('span',{pre:true,attrs:{"class":"hljs-keyword"}},[_v("const")]),_v(" data = "),_c('span',{pre:true,attrs:{"class":"hljs-keyword"}},[_v("await")]),_v(" fetchPortService(requestBody);\n")]),_c('span',[_v("        "),_c('span',{pre:true,attrs:{"class":"hljs-keyword"}},[_v("const")]),_v(" processedData =\n")]),_c('span',[_v("            selectedFilters.length > "),_c('span',{pre:true,attrs:{"class":"hljs-number"}},[_v("0")]),_v("\n")]),_c('span',[_v("                ? filterPortServiceData(data, selectedFilters)\n")]),_c('span',[_v("                : data;\n")]),_c('span',[_v("\n")]),_c('span',[_v("        onPortServiceDataUpdate(processedData, {\n")]),_c('span',[_v("            "),_c('span',{pre:true,attrs:{"class":"hljs-attr"}},[_v("isExpanded")]),_v(": "),_c('span',{pre:true,attrs:{"class":"hljs-literal"}},[_v("true")]),_v(",\n")]),_c('span',[_v("            timeRanges,\n")]),_c('span',[_v("            selectedFilters,\n")]),_c('span',[_v("        });\n")]),_c('span',[_v("    } "),_c('span',{pre:true,attrs:{"class":"hljs-keyword"}},[_v("catch")]),_v(" (error) {\n")]),_c('span',[_v("        "),_c('span',{pre:true,attrs:{"class":"hljs-built_in"}},[_v("console")]),_v(".error("),_c('span',{pre:true,attrs:{"class":"hljs-string"}},[_v("\"Error fetching port service data:\"")]),_v(", error);\n")]),_c('span',[_v("        setDateError(\n")]),_c('span',[_v("            error "),_c('span',{pre:true,attrs:{"class":"hljs-keyword"}},[_v("instanceof")]),_v(" "),_c('span',{pre:true,attrs:{"class":"hljs-built_in"}},[_v("Error")]),_v(" ? error.message : "),_c('span',{pre:true,attrs:{"class":"hljs-string"}},[_v("\"An error occurred\"")]),_v("\n")]),_c('span',[_v("        );\n")]),_c('span',[_v("    } "),_c('span',{pre:true,attrs:{"class":"hljs-keyword"}},[_v("finally")]),_v(" {\n")]),_c('span',[_v("        setIsLoading("),_c('span',{pre:true,attrs:{"class":"hljs-literal"}},[_v("false")]),_v(");\n")]),_c('span',[_v("    }\n")]),_c('span',[_v("};\n")])])])}
},function anonymous(
) {
with(this){return _c('h2',{attrs:{"id":"integration-with-other-components"}},[_v("Integration with Other Components"),_c('a',{staticClass:"fa fa-anchor",attrs:{"href":"#integration-with-other-components","onclick":"event.stopPropagation()"}})])}
},function anonymous(
) {
with(this){return _c('ul',[_c('li',[_c('strong',[_v("Map Visualization")]),_v(": Port locations and terminals are displayed on the map")]),_v(" "),_c('li',[_c('strong',[_v("Vessel Information")]),_v(": Vessel activities within ports are linked to vessel details")]),_v(" "),_c('li',[_c('strong',[_v("Time Slider")]),_v(": Adjusting the time range updates the port service metrics")]),_v(" "),_c('li',[_c('strong',[_v("Search Functionality")]),_v(": Searching for ports filters the displayed port information")])])}
},function anonymous(
) {
with(this){return _c('footer',[_c('div',{staticClass:"text-center"},[_c('small',[_v("AIS Web Portal Documentation | [Generated by "),_c('a',{attrs:{"href":"https://markbind.org/"}},[_v("MarkBind 5.5.3")]),_v("]")])])])}
}];
  