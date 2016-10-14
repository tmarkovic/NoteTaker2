import { Component, OnInit, QueryList, ContentChildren, AfterContentInit } from '@angular/core';
import { TabComponent } from './Tab/tab.component';

@Component({
	selector: 'tabs',
	templateUrl: 'tabs.component.html'
})

export class TabsComponent implements OnInit, AfterContentInit {

	@ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
	ngOnInit() { }
	ngAfterContentInit() {
		// get all active tabs
		let activeTabs = this.tabs.filter((tab) => tab.isActive);
		// if there is no active tab set, activate the first
		if (activeTabs.length === 0) {
			this.selectTab(this.tabs.first);
		}
	}

	selectTab(tab: TabComponent) {
		this.tabs.toArray().forEach((v, k) => v.isActive = false);

		tab.isActive = true;
	}
}