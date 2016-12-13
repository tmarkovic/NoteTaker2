import { Component, Input } from '@angular/core';

/**
 * A single tab
 * 
 * @export
 * @class TabComponent
 */
@Component({
	selector: 'tab',
	templateUrl: './tab.component.html'
})
export class TabComponent {
	/**
	 * Title of the tab
	 * 
	 * @type {string}
	 * @memberOf TabComponent
	 */
	@Input() title: string;
	/**
	 * Tab state
	 * 
	 * 
	 * @memberOf TabComponent
	 */
	@Input() isActive = false;
	/**
	 * Name of font-awesome icon to display
	 * 
	 * @type {string}
	 * @memberOf TabComponent
	 */
	@Input() iconName: string;
}
