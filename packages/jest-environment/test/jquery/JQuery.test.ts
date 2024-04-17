import JQuery from 'jquery';

describe('JQuery', () => {
	beforeEach(() => {
		document.body.innerHTML = `
            <div class="class1 class2" id="id">
                <!-- Comment 1 !-->
                <b>Bold</b>
                <!-- Comment 2 !-->
                <span>Span</span>
            </div>
            <article class="class1 class2" id="id">
                <!-- Comment 1 !-->
                <b>Bold</b>
                <!-- Comment 2 !-->
            </article>
            <label id="checkbox-label">
              <input type="checkbox" />
              <span>Label</span>
            </label>
        `;
	});

	afterEach(() => {
		document.body.innerHTML = '';
	});

	it('Tests integration.', () => {
		JQuery('span').addClass('test-span');
		expect(document.body.children[0].children[1].getAttribute('class')).toBe('test-span');
	});

	it('Handles clicks on labels correctly', () => {
		const onClick = jest.fn();
		JQuery('#checkbox-label input').on('click', onClick);
		JQuery('#checkbox-label')[0].click();
		expect(onClick).toHaveBeenCalledTimes(1);
	});
});
