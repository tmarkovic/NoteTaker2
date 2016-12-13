import { Directive, ElementRef, Input, HostListener, Renderer, AfterViewInit } from '@angular/core';


/**
 * Directive for styling tag markers
 * 
 * @export
 * @class TagDirective
 * @implements {AfterViewInit}
 */
@Directive({ selector: '[tag]' })
export class TagDirective implements AfterViewInit {
	/**
	 * Desired color
	 * 
	 * 
	 * @memberOf TagDirective
	 */
	@Input() color;
	/**
	 * Desired size
	 * 
	 * 
	 * @memberOf TagDirective
	 */
	@Input() size;

	/**
	 * Avaliable colors
	 * 
	 * @type {Object}
	 * @memberOf TagDirective
	 */
	colors: Object = new Object({
		blue: '#2366d1',
		green: '#20bc56',
		yellow: '#ffd83d',
		red: '#ff1f4b',
	});

	/**
	 * Avaliable sizes
	 * 
	 * @type {Object}
	 * @memberOf TagDirective
	 */
	sizes: Object = new Object({
		sm: 'small',
		md: 'medium',
		lg: 'large',
	});

	/**
	 * Creates an instance of TagDirective.
	 * 
	 * @param {ElementRef} el
	 * @param {Renderer} renderer
	 * 
	 * @memberOf TagDirective
	 */
	constructor(private el: ElementRef, private renderer: Renderer) {

	}

	/**
	 * Adds the desired color as a style
	 * and the desired size as a class
	 * 
	 * @memberOf TagDirective
	 */
	ngAfterViewInit() {
		this.renderer.setElementStyle(this.el.nativeElement, 'color', this.getColor(this.color, this.colors));
		this.renderer.setElementClass(this.el.nativeElement.parentNode, `is-${this.getSize(this.size, this.sizes)}`, true);

	}


	/**
	 * Checks if supplied color is avaliable
	 * 
	 * @param {string} colorName
	 * @param {Object} colors
	 * @returns {string}
	 * 
	 * @memberOf TagDirective
	 */
	getColor(colorName: string, colors: Object): string {
		if (colors.hasOwnProperty(colorName)) {
			return colors[colorName];
		} else {
			return '';
		}
	}


	/**
	 * Checks if supplied size is avaliable
	 * 
	 * @param {string} sizeName
	 * @param {Object} sizes
	 * @returns {string}
	 * 
	 * @memberOf TagDirective
	 */
	getSize(sizeName: string, sizes: Object): string {
		if (sizes.hasOwnProperty(sizeName)) {
			return sizes[sizeName];
		} else {
			return '';
		}
	}
}
