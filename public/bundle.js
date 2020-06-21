
(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_data(text, data) {
        data = '' + data;
        if (text.data !== data)
            text.data = data;
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function createEventDispatcher() {
        const component = current_component;
        return (type, detail) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail);
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
            }
        };
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function flush() {
        const seen_callbacks = new Set();
        do {
            // first, call beforeUpdate functions
            // and update components
            while (dirty_components.length) {
                const component = dirty_components.shift();
                set_current_component(component);
                update(component.$$);
            }
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    callback();
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
    }
    function update($$) {
        if ($$.fragment) {
            $$.update($$.dirty);
            run_all($$.before_update);
            $$.fragment.p($$.dirty, $$.ctx);
            $$.dirty = null;
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            remaining: 0,
            callbacks: []
        };
    }
    function check_outros() {
        if (!outros.remaining) {
            run_all(outros.callbacks);
        }
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.callbacks.push(() => {
                outroing.delete(block);
                if (callback) {
                    block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined' ? window : global);
    function outro_and_destroy_block(block, lookup) {
        transition_out(block, 1, () => {
            lookup.delete(block.key);
        });
    }
    function update_keyed_each(old_blocks, changed, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
        let o = old_blocks.length;
        let n = list.length;
        let i = o;
        const old_indexes = {};
        while (i--)
            old_indexes[old_blocks[i].key] = i;
        const new_blocks = [];
        const new_lookup = new Map();
        const deltas = new Map();
        i = n;
        while (i--) {
            const child_ctx = get_context(ctx, list, i);
            const key = get_key(child_ctx);
            let block = lookup.get(key);
            if (!block) {
                block = create_each_block(key, child_ctx);
                block.c();
            }
            else if (dynamic) {
                block.p(changed, child_ctx);
            }
            new_lookup.set(key, new_blocks[i] = block);
            if (key in old_indexes)
                deltas.set(key, Math.abs(i - old_indexes[key]));
        }
        const will_move = new Set();
        const did_move = new Set();
        function insert(block) {
            transition_in(block, 1);
            block.m(node, next);
            lookup.set(block.key, block);
            next = block.first;
            n--;
        }
        while (o && n) {
            const new_block = new_blocks[n - 1];
            const old_block = old_blocks[o - 1];
            const new_key = new_block.key;
            const old_key = old_block.key;
            if (new_block === old_block) {
                // do nothing
                next = new_block.first;
                o--;
                n--;
            }
            else if (!new_lookup.has(old_key)) {
                // remove old block
                destroy(old_block, lookup);
                o--;
            }
            else if (!lookup.has(new_key) || will_move.has(new_key)) {
                insert(new_block);
            }
            else if (did_move.has(old_key)) {
                o--;
            }
            else if (deltas.get(new_key) > deltas.get(old_key)) {
                did_move.add(new_key);
                insert(new_block);
            }
            else {
                will_move.add(old_key);
                o--;
            }
        }
        while (o--) {
            const old_block = old_blocks[o];
            if (!new_lookup.has(old_block.key))
                destroy(old_block, lookup);
        }
        while (n)
            insert(new_blocks[n - 1]);
        return new_blocks;
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        if (component.$$.fragment) {
            run_all(component.$$.on_destroy);
            component.$$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            component.$$.on_destroy = component.$$.fragment = null;
            component.$$.ctx = {};
        }
    }
    function make_dirty(component, key) {
        if (!component.$$.dirty) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty = blank_object();
        }
        component.$$.dirty[key] = true;
    }
    function init(component, options, instance, create_fragment, not_equal$$1, prop_names) {
        const parent_component = current_component;
        set_current_component(component);
        const props = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props: prop_names,
            update: noop,
            not_equal: not_equal$$1,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty: null
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, props, (key, value) => {
                if ($$.ctx && not_equal$$1($$.ctx[key], $$.ctx[key] = value)) {
                    if ($$.bound[key])
                        $$.bound[key](value);
                    if (ready)
                        make_dirty(component, key);
                }
            })
            : props;
        $$.update();
        ready = true;
        run_all($$.before_update);
        $$.fragment = create_fragment($$.ctx);
        if (options.target) {
            if (options.hydrate) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment.l(children(options.target));
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
    }

    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = [];
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (!stop) {
                    return; // not ready
                }
                subscribers.forEach((s) => s[1]());
                subscribers.forEach((s) => s[0](value));
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.push(subscriber);
            if (subscribers.length === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                const index = subscribers.indexOf(subscriber);
                if (index !== -1) {
                    subscribers.splice(index, 1);
                }
                if (subscribers.length === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }
    /**
     * Get the current value from a store by subscribing and immediately unsubscribing.
     * @param store readable
     */
    function get(store) {
        let value;
        store.subscribe((_) => value = _)();
        return value;
    }

    const cart = writable({});

    /* src/components/Card.svelte generated by Svelte v3.6.4 */

    const file = "src/components/Card.svelte";

    // (114:4) {#if inCart > 0}
    function create_if_block(ctx) {
    	var span, em, t0, t1, t2;

    	return {
    		c: function create() {
    			span = element("span");
    			em = element("em");
    			t0 = text("(");
    			t1 = text(ctx.inCart);
    			t2 = text(" in cart)");
    			add_location(em, file, 115, 8, 2219);
    			attr(span, "class", "svelte-vgan03");
    			add_location(span, file, 114, 6, 2204);
    		},

    		m: function mount(target, anchor) {
    			insert(target, span, anchor);
    			append(span, em);
    			append(em, t0);
    			append(em, t1);
    			append(em, t2);
    		},

    		p: function update(changed, ctx) {
    			if (changed.inCart) {
    				set_data(t1, ctx.inCart);
    			}
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(span);
    			}
    		}
    	};
    }

    function create_fragment(ctx) {
    	var div1, img_1, t0, h3, t1, t2, p, t3, t4, t5, div0, button, object, t6, t7, dispose;

    	var if_block = (ctx.inCart > 0) && create_if_block(ctx);

    	return {
    		c: function create() {
    			div1 = element("div");
    			img_1 = element("img");
    			t0 = space();
    			h3 = element("h3");
    			t1 = text(ctx.name);
    			t2 = space();
    			p = element("p");
    			t3 = text("৳ ");
    			t4 = text(ctx.price);
    			t5 = space();
    			div0 = element("div");
    			button = element("button");
    			object = element("object");
    			t6 = text("\n      Add to cart");
    			t7 = space();
    			if (if_block) if_block.c();
    			attr(img_1, "src", ctx.img);
    			attr(img_1, "alt", ctx.name);
    			attr(img_1, "class", "svelte-vgan03");
    			add_location(img_1, file, 102, 2, 1866);
    			attr(h3, "class", "title svelte-vgan03");
    			add_location(h3, file, 103, 2, 1897);
    			attr(p, "class", "price svelte-vgan03");
    			add_location(p, file, 104, 2, 1929);
    			attr(object, "aria-label", "shopping cart");
    			attr(object, "type", "image/svg+xml");
    			attr(object, "data", "img/svg/shopping-cart.svg");
    			attr(object, "class", "svelte-vgan03");
    			add_location(object, file, 107, 6, 2029);
    			attr(button, "class", "svelte-vgan03");
    			add_location(button, file, 106, 4, 1993);
    			attr(div0, "class", "button-group svelte-vgan03");
    			add_location(div0, file, 105, 2, 1962);
    			attr(div1, "class", "item-card svelte-vgan03");
    			add_location(div1, file, 101, 0, 1840);
    			dispose = listen(button, "click", ctx.addToCart);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert(target, div1, anchor);
    			append(div1, img_1);
    			append(div1, t0);
    			append(div1, h3);
    			append(h3, t1);
    			append(div1, t2);
    			append(div1, p);
    			append(p, t3);
    			append(p, t4);
    			append(div1, t5);
    			append(div1, div0);
    			append(div0, button);
    			append(button, object);
    			append(button, t6);
    			append(div0, t7);
    			if (if_block) if_block.m(div0, null);
    		},

    		p: function update(changed, ctx) {
    			if (changed.img) {
    				attr(img_1, "src", ctx.img);
    			}

    			if (ctx.inCart > 0) {
    				if (if_block) {
    					if_block.p(changed, ctx);
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					if_block.m(div0, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},

    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(div1);
    			}

    			if (if_block) if_block.d();
    			dispose();
    		}
    	};
    }

    function instance($$self, $$props, $$invalidate) {
    	

      let { item } = $$props;
      let { img, name, price } = item;
      $$invalidate('img', img = `img/${img}`);

      const cartItems = get(cart);
      let inCart = cartItems[name] ? cartItems[name].count : 0;

      function addToCart() {
        inCart++; $$invalidate('inCart', inCart);
        cart.update(n => {
          return { ...n, [name]: { ...item, count: inCart } };
        });
      }

    	const writable_props = ['item'];
    	Object.keys($$props).forEach(key => {
    		if (!writable_props.includes(key) && !key.startsWith('$$')) console.warn(`<Card> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ('item' in $$props) $$invalidate('item', item = $$props.item);
    	};

    	return {
    		item,
    		img,
    		name,
    		price,
    		inCart,
    		addToCart
    	};
    }

    class Card extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, ["item"]);

    		const { ctx } = this.$$;
    		const props = options.props || {};
    		if (ctx.item === undefined && !('item' in props)) {
    			console.warn("<Card> was created without expected prop 'item'");
    		}
    	}

    	get item() {
    		throw new Error("<Card>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set item(value) {
    		throw new Error("<Card>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var items = [
    	{
    		name: 'Thinkpad X220',
    		price: '20000',
    		img: 'lenoX220.jpg',
    		sku: 'price_1GquBKJ5Fk3rD5oaqDTOlxOV'
    	},
    	{
    		name: 'Thinkpad X230',
    		price: '25000',
    		img: 'lenoX230.jpg',
    		sku: 'price_1GquGpJ5Fk3rD5oaPcN1kpVf'
    	},
    	{
    		name: 'Thinkpad USB C充電端末',
    		price: '2000',
    		img: 'usb-c.jpg',
    		sku: 'sku_HK3pP3oL6bi9Uf'
    	}
    ];

    /* src/components/CardWrapper.svelte generated by Svelte v3.6.4 */

    const file$1 = "src/components/CardWrapper.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = Object.create(ctx);
    	child_ctx.item = list[i];
    	return child_ctx;
    }

    // (47:2) {#each items as item}
    function create_each_block(ctx) {
    	var current;

    	var card = new Card({
    		props: { item: ctx.item },
    		$$inline: true
    	});

    	return {
    		c: function create() {
    			card.$$.fragment.c();
    		},

    		m: function mount(target, anchor) {
    			mount_component(card, target, anchor);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			var card_changes = {};
    			if (changed.items) card_changes.item = ctx.item;
    			card.$set(card_changes);
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(card.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(card.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			destroy_component(card, detaching);
    		}
    	};
    }

    function create_fragment$1(ctx) {
    	var section, current;

    	var each_value = items;

    	var each_blocks = [];

    	for (var i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, () => {
    		each_blocks[i] = null;
    	});

    	return {
    		c: function create() {
    			section = element("section");

    			for (var i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}
    			attr(section, "class", "card-wrapper grid svelte-1e7vhxo");
    			add_location(section, file$1, 45, 0, 706);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert(target, section, anchor);

    			for (var i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(section, null);
    			}

    			current = true;
    		},

    		p: function update(changed, ctx) {
    			if (changed.items) {
    				each_value = items;

    				for (var i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(changed, child_ctx);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(section, null);
    					}
    				}

    				group_outros();
    				for (i = each_value.length; i < each_blocks.length; i += 1) out(i);
    				check_outros();
    			}
    		},

    		i: function intro(local) {
    			if (current) return;
    			for (var i = 0; i < each_value.length; i += 1) transition_in(each_blocks[i]);

    			current = true;
    		},

    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);
    			for (let i = 0; i < each_blocks.length; i += 1) transition_out(each_blocks[i]);

    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(section);
    			}

    			destroy_each(each_blocks, detaching);
    		}
    	};
    }

    class CardWrapper extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$1, safe_not_equal, []);
    	}
    }

    /* src/components/Navbar.svelte generated by Svelte v3.6.4 */

    const file$2 = "src/components/Navbar.svelte";

    // (110:6) {#if cart_sum > 0}
    function create_if_block$1(ctx) {
    	var div, t;

    	return {
    		c: function create() {
    			div = element("div");
    			t = text(ctx.cart_sum);
    			attr(div, "class", "circle svelte-8hlip");
    			add_location(div, file$2, 110, 8, 1948);
    		},

    		m: function mount(target, anchor) {
    			insert(target, div, anchor);
    			append(div, t);
    		},

    		p: function update(changed, ctx) {
    			if (changed.cart_sum) {
    				set_data(t, ctx.cart_sum);
    			}
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(div);
    			}
    		}
    	};
    }

    function create_fragment$2(ctx) {
    	var header, ul, li0, t1, li1, img, t2, dispose;

    	var if_block = (ctx.cart_sum > 0) && create_if_block$1(ctx);

    	return {
    		c: function create() {
    			header = element("header");
    			ul = element("ul");
    			li0 = element("li");
    			li0.textContent = "Security NOW!";
    			t1 = space();
    			li1 = element("li");
    			img = element("img");
    			t2 = space();
    			if (if_block) if_block.c();
    			attr(li0, "class", "svelte-8hlip");
    			add_location(li0, file$2, 101, 4, 1680);
    			attr(img, "class", "shopping-cart svelte-8hlip");
    			attr(img, "aria-label", "shopping cart");
    			attr(img, "alt", "Checkout");
    			attr(img, "src", "img/svg/checkout.svg");
    			attr(img, "height", "34px");
    			add_location(img, file$2, 103, 6, 1762);
    			attr(li1, "class", "svelte-8hlip");
    			add_location(li1, file$2, 102, 4, 1727);
    			attr(ul, "class", "svelte-8hlip");
    			add_location(ul, file$2, 100, 2, 1671);
    			attr(header, "class", "svelte-8hlip");
    			add_location(header, file$2, 99, 0, 1660);

    			dispose = [
    				listen(li0, "click", ctx.goToHome),
    				listen(li1, "click", ctx.goToCheckout)
    			];
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert(target, header, anchor);
    			append(header, ul);
    			append(ul, li0);
    			append(ul, t1);
    			append(ul, li1);
    			append(li1, img);
    			append(li1, t2);
    			if (if_block) if_block.m(li1, null);
    		},

    		p: function update(changed, ctx) {
    			if (ctx.cart_sum > 0) {
    				if (if_block) {
    					if_block.p(changed, ctx);
    				} else {
    					if_block = create_if_block$1(ctx);
    					if_block.c();
    					if_block.m(li1, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},

    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(header);
    			}

    			if (if_block) if_block.d();
    			run_all(dispose);
    		}
    	};
    }

    function instance$1($$self, $$props, $$invalidate) {
    	

      const dispatch = createEventDispatcher();

      let cart_sum = 0;

      const unsubscribe = cart.subscribe(items => {
        const itemValues = Object.values(items);
        $$invalidate('cart_sum', cart_sum = 0);
        itemValues.forEach(item => {
          $$invalidate('cart_sum', cart_sum += item.count);
        });
      });

      function goToHome() {
        dispatch("nav", {
          option: "home"
        });
      }

      function goToCheckout() {
        dispatch("nav", {
          option: "checkout"
        });
      }

    	return { cart_sum, goToHome, goToCheckout };
    }

    class Navbar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$2, safe_not_equal, []);
    	}
    }

    /* src/components/CheckoutItem.svelte generated by Svelte v3.6.4 */

    const file$3 = "src/components/CheckoutItem.svelte";

    function create_fragment$3(ctx) {
    	var div2, img_1, img_1_src_value, t0, div1, h3, t1, t2, p0, t3, t4, t5, div0, button0, t7, p1, t8, t9, button1, t11, button2, object, t12, dispose;

    	return {
    		c: function create() {
    			div2 = element("div");
    			img_1 = element("img");
    			t0 = space();
    			div1 = element("div");
    			h3 = element("h3");
    			t1 = text(ctx.name);
    			t2 = space();
    			p0 = element("p");
    			t3 = text("Price: ৳ ");
    			t4 = text(ctx.price);
    			t5 = space();
    			div0 = element("div");
    			button0 = element("button");
    			button0.textContent = "+";
    			t7 = space();
    			p1 = element("p");
    			t8 = text(ctx.count);
    			t9 = space();
    			button1 = element("button");
    			button1.textContent = "-";
    			t11 = space();
    			button2 = element("button");
    			object = element("object");
    			t12 = text("\n        Remove");
    			attr(img_1, "src", img_1_src_value = `img/${ctx.img}`);
    			attr(img_1, "alt", ctx.name);
    			attr(img_1, "class", "svelte-fc1ub7");
    			add_location(img_1, file$3, 121, 2, 2019);
    			attr(h3, "class", "title svelte-fc1ub7");
    			add_location(h3, file$3, 123, 4, 2092);
    			attr(p0, "class", "price svelte-fc1ub7");
    			add_location(p0, file$3, 124, 4, 2126);
    			attr(button0, "class", "add svelte-fc1ub7");
    			add_location(button0, file$3, 126, 6, 2194);
    			attr(p1, "class", "svelte-fc1ub7");
    			add_location(p1, file$3, 127, 6, 2261);
    			attr(button1, "class", "subtract svelte-fc1ub7");
    			add_location(button1, file$3, 128, 6, 2282);
    			attr(object, "aria-label", "remove");
    			attr(object, "type", "image/svg+xml");
    			attr(object, "data", "img/svg/cancel.svg");
    			attr(object, "class", "svelte-fc1ub7");
    			add_location(object, file$3, 130, 8, 2408);
    			attr(button2, "class", "remove svelte-fc1ub7");
    			add_location(button2, file$3, 129, 6, 2354);
    			attr(div0, "class", "count svelte-fc1ub7");
    			add_location(div0, file$3, 125, 4, 2168);
    			attr(div1, "class", "item-meta-data svelte-fc1ub7");
    			add_location(div1, file$3, 122, 2, 2059);
    			attr(div2, "class", "item-grid svelte-fc1ub7");
    			add_location(div2, file$3, 120, 0, 1993);

    			dispose = [
    				listen(button0, "click", ctx.countButtonHandler),
    				listen(button1, "click", ctx.countButtonHandler),
    				listen(button2, "click", ctx.removeItem)
    			];
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert(target, div2, anchor);
    			append(div2, img_1);
    			append(div2, t0);
    			append(div2, div1);
    			append(div1, h3);
    			append(h3, t1);
    			append(div1, t2);
    			append(div1, p0);
    			append(p0, t3);
    			append(p0, t4);
    			append(div1, t5);
    			append(div1, div0);
    			append(div0, button0);
    			append(div0, t7);
    			append(div0, p1);
    			append(p1, t8);
    			append(div0, t9);
    			append(div0, button1);
    			append(div0, t11);
    			append(div0, button2);
    			append(button2, object);
    			append(button2, t12);
    		},

    		p: function update(changed, ctx) {
    			if (changed.count) {
    				set_data(t8, ctx.count);
    			}
    		},

    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(div2);
    			}

    			run_all(dispose);
    		}
    	};
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { item } = $$props;
      let { name, price, img, count } = item;

      const countButtonHandler = e => {
        if (e.target.classList.contains("add")) {
          count++; $$invalidate('count', count);
        } else if (count >= 1) {
          count--; $$invalidate('count', count);
        }
        cart.update(n => ({ ...n, [name]: { ...n[name], count } }));
      };

      const removeItem = () => {
        cart.update(n => {
          delete n[name];
          return n;
        });
      };

    	const writable_props = ['item'];
    	Object.keys($$props).forEach(key => {
    		if (!writable_props.includes(key) && !key.startsWith('$$')) console.warn(`<CheckoutItem> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ('item' in $$props) $$invalidate('item', item = $$props.item);
    	};

    	return {
    		item,
    		name,
    		price,
    		img,
    		count,
    		countButtonHandler,
    		removeItem
    	};
    }

    class CheckoutItem extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$3, safe_not_equal, ["item"]);

    		const { ctx } = this.$$;
    		const props = options.props || {};
    		if (ctx.item === undefined && !('item' in props)) {
    			console.warn("<CheckoutItem> was created without expected prop 'item'");
    		}
    	}

    	get item() {
    		throw new Error("<CheckoutItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set item(value) {
    		throw new Error("<CheckoutItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Checkout.svelte generated by Svelte v3.6.4 */
    const { Object: Object_1 } = globals;

    const file$4 = "src/components/Checkout.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = Object_1.create(ctx);
    	child_ctx.item = list[i];
    	return child_ctx;
    }

    // (87:2) {:else}
    function create_else_block_1(ctx) {
    	var each_blocks = [], each_1_lookup = new Map(), t, button, current, dispose;

    	var each_value = ctx.cartItems;

    	const get_key = ctx => ctx.item.name;

    	for (var i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context$1(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block$1(key, child_ctx));
    	}

    	return {
    		c: function create() {
    			for (i = 0; i < each_blocks.length; i += 1) each_blocks[i].c();

    			t = space();
    			button = element("button");
    			button.textContent = "Checkout";
    			attr(button, "class", "checkout svelte-79wqkg");
    			add_location(button, file$4, 90, 4, 1892);
    			dispose = listen(button, "click", ctx.startCheckout);
    		},

    		m: function mount(target, anchor) {
    			for (i = 0; i < each_blocks.length; i += 1) each_blocks[i].m(target, anchor);

    			insert(target, t, anchor);
    			insert(target, button, anchor);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			const each_value = ctx.cartItems;

    			group_outros();
    			each_blocks = update_keyed_each(each_blocks, changed, get_key, 1, ctx, each_value, each_1_lookup, t.parentNode, outro_and_destroy_block, create_each_block$1, t, get_each_context$1);
    			check_outros();
    		},

    		i: function intro(local) {
    			if (current) return;
    			for (var i = 0; i < each_value.length; i += 1) transition_in(each_blocks[i]);

    			current = true;
    		},

    		o: function outro(local) {
    			for (i = 0; i < each_blocks.length; i += 1) transition_out(each_blocks[i]);

    			current = false;
    		},

    		d: function destroy(detaching) {
    			for (i = 0; i < each_blocks.length; i += 1) each_blocks[i].d(detaching);

    			if (detaching) {
    				detach(t);
    				detach(button);
    			}

    			dispose();
    		}
    	};
    }

    // (81:2) {#if cartItems.length === 0}
    function create_if_block$2(ctx) {
    	var if_block_anchor;

    	function select_block_type_1(ctx) {
    		return create_else_block;
    	}

    	var current_block_type = select_block_type_1();
    	var if_block = current_block_type(ctx);

    	return {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},

    		m: function mount(target, anchor) {
    			if_block.m(target, anchor);
    			insert(target, if_block_anchor, anchor);
    		},

    		p: function update(changed, ctx) {
    			if (current_block_type !== (current_block_type = select_block_type_1())) {
    				if_block.d(1);
    				if_block = current_block_type(ctx);
    				if (if_block) {
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			}
    		},

    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			if_block.d(detaching);

    			if (detaching) {
    				detach(if_block_anchor);
    			}
    		}
    	};
    }

    // (88:4) {#each cartItems as item (item.name)}
    function create_each_block$1(key_1, ctx) {
    	var first, current;

    	var checkoutitem = new CheckoutItem({
    		props: { item: ctx.item },
    		$$inline: true
    	});

    	return {
    		key: key_1,

    		first: null,

    		c: function create() {
    			first = empty();
    			checkoutitem.$$.fragment.c();
    			this.first = first;
    		},

    		m: function mount(target, anchor) {
    			insert(target, first, anchor);
    			mount_component(checkoutitem, target, anchor);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			var checkoutitem_changes = {};
    			if (changed.cartItems) checkoutitem_changes.item = ctx.item;
    			checkoutitem.$set(checkoutitem_changes);
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(checkoutitem.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(checkoutitem.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(first);
    			}

    			destroy_component(checkoutitem, detaching);
    		}
    	};
    }

    // (84:4) {:else}
    function create_else_block(ctx) {
    	var p;

    	return {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Your cart is empty";
    			attr(p, "class", "empty-message svelte-79wqkg");
    			add_location(p, file$4, 84, 6, 1736);
    		},

    		m: function mount(target, anchor) {
    			insert(target, p, anchor);
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(p);
    			}
    		}
    	};
    }

    function create_fragment$4(ctx) {
    	var div, h1, t_1, current_block_type_index, if_block, current;

    	var if_block_creators = [
    		create_if_block$2,
    		create_else_block_1
    	];

    	var if_blocks = [];

    	function select_block_type(ctx) {
    		if (ctx.cartItems.length === 0) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	return {
    		c: function create() {
    			div = element("div");
    			h1 = element("h1");
    			h1.textContent = "My Cart";
    			t_1 = space();
    			if_block.c();
    			add_location(h1, file$4, 79, 2, 1583);
    			attr(div, "class", "checkout-container svelte-79wqkg");
    			add_location(div, file$4, 78, 0, 1548);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert(target, div, anchor);
    			append(div, h1);
    			append(div, t_1);
    			if_blocks[current_block_type_index].m(div, null);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			var previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);
    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(changed, ctx);
    			} else {
    				group_outros();
    				transition_out(if_blocks[previous_block_index], 1, () => {
    					if_blocks[previous_block_index] = null;
    				});
    				check_outros();

    				if_block = if_blocks[current_block_type_index];
    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				}
    				transition_in(if_block, 1);
    				if_block.m(div, null);
    			}
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(div);
    			}

    			if_blocks[current_block_type_index].d();
    		}
    	};
    }

    function instance$3($$self, $$props, $$invalidate) {
    	

      let cartItems = [];
      const unsubscribe = cart.subscribe(items => {
        $$invalidate('cartItems', cartItems = Object.values(items));
      });

      // const checkout = () => {
      //   console.log(cartItems);
      //   checkedOut = true;
      //   cart.update(n => {
      //     return {};
      //   });
      // };

        let stripe = Stripe("pk_test_N2Kfa6ezxQc8rld0adGzibAV00OLGaocEP");

      // Basic Checkout
      async function startCheckout() {

        const { error } = await stripe.redirectToCheckout({
          lineItems: [{price: cartItems[0].sku, quantity: cartItems[0].count}],
          mode: "payment",
          successUrl: "https://localhost:5000/success",
          cancelUrl: "https://localhost:5000/error"
        });

        if (error) {
          alert("our payment system is broken!");
        }
      }

    	return { cartItems, startCheckout };
    }

    class Checkout extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$4, safe_not_equal, []);
    	}
    }

    /* src/App.svelte generated by Svelte v3.6.4 */

    // (16:0) {:else}
    function create_else_block$1(ctx) {
    	var current;

    	var checkout = new Checkout({ $$inline: true });

    	return {
    		c: function create() {
    			checkout.$$.fragment.c();
    		},

    		m: function mount(target, anchor) {
    			mount_component(checkout, target, anchor);
    			current = true;
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(checkout.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(checkout.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			destroy_component(checkout, detaching);
    		}
    	};
    }

    // (14:0) {#if nav === 'home'}
    function create_if_block$3(ctx) {
    	var current;

    	var cardwrapper = new CardWrapper({ $$inline: true });

    	return {
    		c: function create() {
    			cardwrapper.$$.fragment.c();
    		},

    		m: function mount(target, anchor) {
    			mount_component(cardwrapper, target, anchor);
    			current = true;
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(cardwrapper.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(cardwrapper.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			destroy_component(cardwrapper, detaching);
    		}
    	};
    }

    function create_fragment$5(ctx) {
    	var t, current_block_type_index, if_block, if_block_anchor, current;

    	var navbar = new Navbar({ $$inline: true });
    	navbar.$on("nav", ctx.navHandler);

    	var if_block_creators = [
    		create_if_block$3,
    		create_else_block$1
    	];

    	var if_blocks = [];

    	function select_block_type(ctx) {
    		if (ctx.nav === 'home') return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	return {
    		c: function create() {
    			navbar.$$.fragment.c();
    			t = space();
    			if_block.c();
    			if_block_anchor = empty();
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			mount_component(navbar, target, anchor);
    			insert(target, t, anchor);
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert(target, if_block_anchor, anchor);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			var previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);
    			if (current_block_type_index !== previous_block_index) {
    				group_outros();
    				transition_out(if_blocks[previous_block_index], 1, () => {
    					if_blocks[previous_block_index] = null;
    				});
    				check_outros();

    				if_block = if_blocks[current_block_type_index];
    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				}
    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(navbar.$$.fragment, local);

    			transition_in(if_block);
    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(navbar.$$.fragment, local);
    			transition_out(if_block);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			destroy_component(navbar, detaching);

    			if (detaching) {
    				detach(t);
    			}

    			if_blocks[current_block_type_index].d(detaching);

    			if (detaching) {
    				detach(if_block_anchor);
    			}
    		}
    	};
    }

    function instance$4($$self, $$props, $$invalidate) {
    	

      let nav = "home";

      function navHandler(event) {
        $$invalidate('nav', nav = event.detail.option);
      }

    	return { nav, navHandler };
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$5, safe_not_equal, []);
    	}
    }

    const app = new App({
    	target: document.body
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
