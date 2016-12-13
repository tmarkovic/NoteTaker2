import { Component, OnInit, QueryList, ContentChildren, AfterContentInit } from '@angular/core';
import { TabComponent } from './Tab/tab.component';

/**
 * Tab component
 * 
 * @export
 * @class TabsComponent
 * @implements {OnInit}
 * @implements {AfterContentInit}
 */
@Component({
	selector: 'tabs',
	templateUrl: 'tabs.component.html'
})

export class TabsComponent implements OnInit, AfterContentInit {

	/**
	 * Collection of all tab component children
	 * 
	 * @type {QueryList<TabComponent>}
	 * @memberOf TabsComponent
	 */
	@ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

	/**
	 * 
	 * 
	 * 
	 * @memberOf TabsComponent
	 */
	ngOnInit() { } // tslint:disable-line

	/* tslint:disable:completed-docs*/
	/**
	 * 
	 * 
	 * 
	 * @memberOf TabsComponent
	 */
	ngAfterContentInit() {

		// filter active tabs
		let activeTabs = this.tabs.filter((tab) => tab.isActive);
		if (activeTabs.length === 0 || activeTabs.length > 1) {
			this.selectTab(this.tabs.first);
		}
	}
	/* tslint:enable:completed-docs*/

	/**
	 * shows the content of selected tab
	 * 
	 * @param {TabComponent} tab
	 * 
	 * @memberOf TabsComponent
	 */
	selectTab(tab: TabComponent) {
		this.tabs.toArray().forEach((v, k) => v.isActive = false);

		tab.isActive = true;
	}
}
