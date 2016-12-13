import { Directive, ElementRef, Input, HostListener, Renderer, AfterViewInit } from '@angular/core';


@Directive({ selector: '[tag]' })
export class TagDirective implements AfterViewInit {
	@Input() color;
	@Input() size;

	colors: Object = new Object({
		blue: '#2366d1',
		green: '#20bc56',
		yellow: '#ffd83d',
		red: '#ff1f4b',
	});

	sizes: Object = new Object({
		sm: 'small',
		md: 'medium',
		lg: 'large',
	})

	constructor(private el: ElementRef, private renderer: Renderer) {

	}

	ngAfterViewInit() {
		this.renderer.setElementStyle(this.el.nativeElement, 'color', this.getColor(this.color, this.colors));
		this.renderer.setElementClass(this.el.nativeElement.parentNode, `is-${this.getSize(this.size, this.sizes)}`, true);

	}


	getColor(colorName: string, colors: Object): string {
		if (colors.hasOwnProperty(colorName)) {
			return colors[colorName];
		} else {
			return '';
		}
	}


	getSize(sizeName: string, sizes: Object): string {
		if (sizes.hasOwnProperty(sizeName)) {
			return sizes[sizeName];
		} else {
			return ''
		}
	}
}
