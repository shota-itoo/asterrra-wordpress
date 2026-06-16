/**
 * Block Animation Frontend
 * ブロックアニメーションのフロントエンド処理
 * Web Animations API版
 */
(function () {
	'use strict';

	/**
	 * HEX色コードをRGBA形式に変換
	 * @param {string} hex - HEX色コード（#RRGGBB形式）
	 * @param {number} alpha - 透明度（0-1）
	 * @returns {string} RGBA形式の色文字列
	 */
	// ── レスポンシブ判定（デバイス別アニメON/OFF） ──
	const FLAVOR_ANIM_BP = { tablet: 959, mobile: 599 };
	function currentDevice() {
		const w = window.innerWidth;
		if (w <= FLAVOR_ANIM_BP.mobile) return 'sp';
		if (w <= FLAVOR_ANIM_BP.tablet) return 'tablet';
		return 'pc';
	}
	// animation.devices（['pc','tablet','sp']）。未設定/空は全デバイス対象
	function animAppliesToDevice(animation) {
		const devs = animation && animation.devices;
		if (!Array.isArray(devs) || devs.length === 0) return true;
		return devs.indexOf(currentDevice()) !== -1;
	}

	function hexToRgba(hex, alpha = 1) {
		if (!hex) return '';
		// 既にrgba形式の場合はそのまま返す
		if (hex.startsWith('rgba') || hex.startsWith('rgb')) {
			return hex;
		}
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		if (!result) return hex; // 変換できない場合はそのまま返す
		const r = parseInt(result[1], 16);
		const g = parseInt(result[2], 16);
		const b = parseInt(result[3], 16);
		if (alpha >= 1) {
			return hex; // 透明度が1の場合はHEXのまま返す
		}
		return `rgba(${r}, ${g}, ${b}, ${alpha})`;
	}

	/**
	 * アニメーション種類ごとのキーフレーム定義
	 */
	const ANIMATION_KEYFRAMES = {
		fade: [
			{ opacity: 0 },
			{ opacity: 1 }
		],
		slideUp: [
			{ opacity: 0, transform: 'translateY(var(--distance))' },
			{ opacity: 1, transform: 'translateY(0)' }
		],
		slideDown: [
			{ opacity: 0, transform: 'translateY(calc(var(--distance) * -1))' },
			{ opacity: 1, transform: 'translateY(0)' }
		],
		slideLeft: [
			{ opacity: 0, transform: 'translateX(calc(var(--distance) * -1))' },
			{ opacity: 1, transform: 'translateX(0)' }
		],
		slideRight: [
			{ opacity: 0, transform: 'translateX(var(--distance))' },
			{ opacity: 1, transform: 'translateX(0)' }
		],
		zoomIn: [
			{ opacity: 0, transform: 'scale(var(--scale))' },
			{ opacity: 1, transform: 'scale(1)' }
		],
		zoomOut: [
			{ opacity: 0, transform: 'scale(calc(2 - var(--scale)))' },
			{ opacity: 1, transform: 'scale(1)' }
		],
		rotateIn: [
			{ opacity: 0, transform: 'rotate(calc(var(--rotation) * -1))' },
			{ opacity: 1, transform: 'rotate(0)' }
		],
		bounceIn: [
			{ opacity: 0, transform: 'scale(0.3)', offset: 0 },
			{ opacity: 1, transform: 'scale(1.05)', offset: 0.5 },
			{ transform: 'scale(0.9)', offset: 0.7 },
			{ opacity: 1, transform: 'scale(1)', offset: 1 }
		],
		shake: [
			{ transform: 'translateX(0)', offset: 0 },
			{ transform: 'translateX(calc(var(--intensity) * -1))', offset: 0.1 },
			{ transform: 'translateX(var(--intensity))', offset: 0.2 },
			{ transform: 'translateX(calc(var(--intensity) * -1))', offset: 0.3 },
			{ transform: 'translateX(var(--intensity))', offset: 0.4 },
			{ transform: 'translateX(calc(var(--intensity) * -1))', offset: 0.5 },
			{ transform: 'translateX(var(--intensity))', offset: 0.6 },
			{ transform: 'translateX(calc(var(--intensity) * -1))', offset: 0.7 },
			{ transform: 'translateX(var(--intensity))', offset: 0.8 },
			{ transform: 'translateX(calc(var(--intensity) * -1))', offset: 0.9 },
			{ transform: 'translateX(0)', offset: 1 }
		],
		pulseIn: [
			{ opacity: 0, transform: 'scale(var(--scale))', offset: 0 },
			{ opacity: 1, transform: 'scale(1.05)', offset: 0.5 },
			{ opacity: 1, transform: 'scale(1)', offset: 1 }
		],
		flipInX: [
			{ opacity: 0, transform: 'perspective(400px) rotateX(90deg)', offset: 0 },
			{ transform: 'perspective(400px) rotateX(-10deg)', offset: 0.4 },
			{ transform: 'perspective(400px) rotateX(10deg)', offset: 0.7 },
			{ opacity: 1, transform: 'perspective(400px) rotateX(0)', offset: 1 }
		],
		flipInY: [
			{ opacity: 0, transform: 'perspective(400px) rotateY(90deg)', offset: 0 },
			{ transform: 'perspective(400px) rotateY(-10deg)', offset: 0.4 },
			{ transform: 'perspective(400px) rotateY(10deg)', offset: 0.7 },
			{ opacity: 1, transform: 'perspective(400px) rotateY(0)', offset: 1 }
		]
	};

	/**
	 * ホバーアニメーション用変換値を取得
	 */
	const HOVER_TRANSFORMS = {
		zoom: (scale) => `scale(${scale})`,
		slideUp: (distance) => `translateY(-${distance}px)`,
		slideDown: (distance) => `translateY(${distance}px)`,
		slideLeft: (distance) => `translateX(-${distance}px)`,
		slideRight: (distance) => `translateX(${distance}px)`,
		rotate: (rotation) => `rotate(${rotation}deg)`,
		flipX: (rotation) => `perspective(400px) rotateX(${rotation}deg)`,
		flipY: (rotation) => `perspective(400px) rotateY(${rotation}deg)`
	};

	/**
	 * キーフレーム名を取得
	 */
	function getKeyframeName(animation) {
		const type = animation.type;
		const direction = animation.direction || 'up';

		switch (type) {
			case 'fade':
				return 'fade';
			case 'slide':
				return `slide${direction.charAt(0).toUpperCase() + direction.slice(1)}`;
			case 'zoom':
				return 'zoomIn';
			case 'rotate':
				return 'rotateIn';
			case 'bounce':
				return 'bounceIn';
			case 'shake':
				return 'shake';
			case 'pulse':
				return 'pulseIn';
			case 'flip':
				return direction === 'up' || direction === 'down' ? 'flipInX' : 'flipInY';
			default:
				return null;
		}
	}

	/**
	 * CSS変数をキーフレームに適用した値を取得
	 */
	function resolveKeyframes(keyframeName, animation) {
		const baseKeyframes = ANIMATION_KEYFRAMES[keyframeName];
		if (!baseKeyframes) return null;

		const distance = `${animation.distance || 50}px`;
		const scale = animation.scale || 0.9;
		const rotation = `${animation.rotation || 360}deg`;
		const intensity = `${(animation.intensity || 5) * 4}px`;

		// キーフレームをコピーして変数を実際の値に置換
		return baseKeyframes.map(frame => {
			const newFrame = { ...frame };
			if (newFrame.transform) {
				newFrame.transform = newFrame.transform
					.replace(/var\(--distance\)/g, distance)
					.replace(/var\(--scale\)/g, scale)
					.replace(/var\(--rotation\)/g, rotation)
					.replace(/var\(--intensity\)/g, intensity);
			}
			return newFrame;
		});
	}

	/**
	 * Web Animations APIでアニメーションを再生
	 */
	function playAnimation(element, animation, callback) {
		const keyframeName = getKeyframeName(animation);
		if (!keyframeName) {
			if (callback) callback();
			return;
		}

		const keyframes = resolveKeyframes(keyframeName, animation);
		if (!keyframes) {
			if (callback) callback();
			return;
		}

		const duration = animation.duration || 500;
		const easing = animation.easing || 'ease';
		const delay = animation.delay || 0;

		// 表示状態にする（ただしopacityはアニメーションで制御するのでここでは設定しない）
		element.style.visibility = 'visible';

		// Web Animations APIでアニメーション実行
		const animationInstance = element.animate(keyframes, {
			duration: duration,
			easing: easing,
			delay: delay,
			fill: 'forwards'
		});

		animationInstance.onfinish = () => {
			element.classList.add('is-animated');
			// アニメーション終了後に最終状態を適用
			element.style.opacity = '1';
			element.style.transform = '';
			if (callback) callback();
		};
	}

	/**
	 * スクロールトリガーを設定
	 */
	function setupScrollAnimation(element, animation) {
		element.setAttribute('data-animation-trigger', 'scroll');

		// 発火位置はビューポート基準（rootMargin）。要素の高さに依存せず発火する。
		// scrollThreshold = ビューポート下端から何割の位置で発火するか（0〜0.4）。
		// 旧仕様の「要素の%」値もそのまま流用でき、画面より高い要素でも固まらない。
		let offset = (animation.scrollThreshold != null) ? animation.scrollThreshold : 0.15;
		if (offset < 0) offset = 0;
		if (offset > 0.4) offset = 0.4; // 画面下部の要素も確実に発火させるための上限
		const rootMarginBottom = Math.round(offset * 100);

		// IntersectionObserver 非対応環境では即時表示（真っ白防止）
		if (typeof IntersectionObserver === 'undefined') {
			playAnimation(element, animation);
			return;
		}

		let played = false;
		const reveal = () => {
			if (played) return;
			played = true;
			playAnimation(element, animation);
		};

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						reveal();
						if (animation.scrollOnce !== false) {
							observer.unobserve(element);
						}
					}
				});
			},
			{
				threshold: 0,
				rootMargin: '0px 0px -' + rootMarginBottom + '% 0px'
			}
		);

		observer.observe(element);

		// 安全網: 万一発火しないまま一定時間が経過し、要素が表示領域内にあれば強制表示
		setTimeout(() => {
			if (played) return;
			const r = element.getBoundingClientRect();
			if (r.top < window.innerHeight && r.bottom > 0) {
				observer.unobserve(element);
				reveal();
			}
		}, 2500);
	}

	/**
	 * ホバートリガーを設定（Web Animations API版）
	 */
	function setupHoverAnimation(element, animation, hasScrollOrLoadTrigger = false) {
		const type = animation.type;
		const direction = animation.direction || 'up';
		const duration = animation.duration || 300;
		const easing = animation.easing || 'ease';
		const distance = animation.distance || 10;
		const scale = animation.scale || 1.05;
		const rotation = animation.rotation || 15;

		// ホバースタイル設定用（RGBA対応）
		const hoverBgColorHex = animation.hoverBackgroundColor;
		const hoverBgColorAlpha = animation.hoverBackgroundColorAlpha !== undefined ? animation.hoverBackgroundColorAlpha : 1;
		const hoverBgColor = hoverBgColorHex ? hexToRgba(hoverBgColorHex, hoverBgColorAlpha) : '';
		const hoverColor = animation.hoverColor;
		const hoverBorderColorHex = animation.hoverBorderColor;
		const hoverBorderColorAlpha = animation.hoverBorderColorAlpha !== undefined ? animation.hoverBorderColorAlpha : 1;
		const hoverBorderColor = hoverBorderColorHex ? hexToRgba(hoverBorderColorHex, hoverBorderColorAlpha) : '';
		const hoverBorderWidth = animation.hoverBorderWidth || 1;
		const hoverBoxShadow = animation.hoverBoxShadow || '';

		// 文字色・背景色はCSS変数+クラス方式で処理（子要素への継承のため）
		if (hoverColor) {
			element.setAttribute('data-hover-color', hoverColor);
			element.style.setProperty('--animation-hover-color', hoverColor);
		}
		if (hoverBgColor) {
			element.setAttribute('data-hover-bg-color', hoverBgColor);
			element.style.setProperty('--animation-hover-bg-color', hoverBgColor);
		}

		// ホバーオーバーレイ設定
		const hoverShowOverlay = animation.hoverShowOverlay || false;
		const hoverOverlayColor = animation.hoverOverlayColor || '#000000';
		const hoverOverlayOpacity = animation.hoverOverlayOpacity !== undefined ? animation.hoverOverlayOpacity : 0.3;

		// オーバーレイ要素
		let overlayElement = null;
		let overlayAnimation = null;

		// 現在実行中のアニメーションを追跡
		let currentAnimation = null;
		let isHovering = false;

		// 元のスタイルを保存（boxShadowはCSS由来の場合があるためcomputedStyleから取得）
		const computedStyle = getComputedStyle(element);
		const originalStyles = {
			transform: element.style.transform || '',
			backgroundColor: element.style.backgroundColor || '',
			color: element.style.color || '',
			borderColor: element.style.borderColor || '',
			borderWidth: element.style.borderWidth || '',
			borderStyle: element.style.borderStyle || '',
			boxShadow: computedStyle.boxShadow || 'none'
		};

		// 基底transform（中央寄せ用 translateX(-50%) などCSS/インライン由来のtransform）。
		// Web Animations API のホバーアニメは CSS の transform を上書きするため、
		// ホバー時に都度 computedStyle から取得し、ホバー効果をこの上に合成して中央寄せ等を保持する。
		let baseTransform = '';
		const readBaseTransform = () => {
			const t = getComputedStyle( element ).transform;
			return t && t !== 'none' ? t : '';
		};
		// 基底transform に効果transformを合成する（baseが在ればその後ろに連結）
		const composeTransform = ( effect ) => {
			const e = effect && effect !== 'none' ? effect : '';
			if ( baseTransform && e ) return baseTransform + ' ' + e;
			return baseTransform || e || 'none';
		};

		// オーバーレイ要素の作成
		if (hoverShowOverlay) {
			// 親要素にposition: relativeとoverflow: hiddenを設定
			const computedPosition = getComputedStyle(element).position;
			if (computedPosition === 'static') {
				element.style.position = 'relative';
			}
			// border-radiusがはみ出さないようにoverflow: hiddenを設定
			element.style.overflow = 'hidden';

			// オーバーレイ要素を作成
			overlayElement = document.createElement('div');
			overlayElement.className = 'block-hover-overlay';
			overlayElement.style.cssText = `
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-color: ${hoverOverlayColor};
				opacity: 0;
				pointer-events: none;
				z-index: 1;
				border-radius: inherit;
			`;
			element.appendChild(overlayElement);
		}

		// トランジションスタイル変更用のキーフレームを取得
		function getHoverKeyframes() {
			let transformValue = '';

			switch (type) {
				case 'zoom':
					transformValue = HOVER_TRANSFORMS.zoom(scale);
					break;
				case 'slide':
					const slideKey = `slide${direction.charAt(0).toUpperCase() + direction.slice(1)}`;
					if (HOVER_TRANSFORMS[slideKey]) {
						transformValue = HOVER_TRANSFORMS[slideKey](distance);
					}
					break;
				case 'rotate':
					transformValue = HOVER_TRANSFORMS.rotate(rotation);
					break;
				case 'flip':
					if (direction === 'up' || direction === 'down') {
						transformValue = HOVER_TRANSFORMS.flipX(rotation);
					} else {
						transformValue = HOVER_TRANSFORMS.flipY(rotation);
					}
					break;
				case 'fade':
					// fadeはopacityのみ
					return [
						{ opacity: 1 },
						{ opacity: animation.hoverOpacity || 0.7 }
					];
			}

			// スタイル変更を含むキーフレーム（基底transform=中央寄せ等を保持したまま効果を合成）
			const fromFrame = { transform: baseTransform || 'none' };
			const toFrame = { transform: composeTransform( transformValue ) };

			// hoverBgColor, hoverColorはCSS変数+クラス方式で処理するため、ここでは処理しない
			if (hoverBorderColor) {
				fromFrame.borderColor = originalStyles.borderColor || 'transparent';
				fromFrame.borderWidth = originalStyles.borderWidth || '0px';
				fromFrame.borderStyle = originalStyles.borderStyle || 'solid';
				toFrame.borderColor = hoverBorderColor;
				toFrame.borderWidth = `${hoverBorderWidth}px`;
				toFrame.borderStyle = 'solid';
			}

			if (hoverBoxShadow) {
				fromFrame.boxShadow = originalStyles.boxShadow;
				toFrame.boxShadow = hoverBoxShadow;
			}

			return [fromFrame, toFrame];
		}

		// スタイルのみ変更用キーフレーム（bounce/shake/pulse用）
		function getStyleOnlyKeyframes() {
			if (!hoverBorderColor && !hoverBoxShadow) {
				return null;
			}

			const fromFrame = {};
			const toFrame = {};

			// hoverBgColor, hoverColorはCSS変数+クラス方式で処理するため、ここでは処理しない
			if (hoverBorderColor) {
				fromFrame.borderColor = originalStyles.borderColor || 'transparent';
				fromFrame.borderWidth = originalStyles.borderWidth || '0px';
				fromFrame.borderStyle = originalStyles.borderStyle || 'solid';
				toFrame.borderColor = hoverBorderColor;
				toFrame.borderWidth = `${hoverBorderWidth}px`;
				toFrame.borderStyle = 'solid';
			}

			if (hoverBoxShadow) {
				fromFrame.boxShadow = originalStyles.boxShadow;
				toFrame.boxShadow = hoverBoxShadow;
			}

			return [fromFrame, toFrame];
		}

		// bounce, shake, pulseは継続アニメーション
		function getContinuousKeyframes() {
			let frames = null;
			switch (type) {
				case 'bounce': {
					const bounceIntensity = (animation.intensity || 5) * 4;
					frames = [
						{ transform: 'translateY(0)', offset: 0 },
						{ transform: `translateY(-${bounceIntensity}px)`, offset: 0.4 },
						{ transform: `translateY(-${bounceIntensity * 0.5}px)`, offset: 0.6 },
						{ transform: 'translateY(0)', offset: 0.8 },
						{ transform: 'translateY(0)', offset: 1 }
					];
					break;
				}
				case 'shake': {
					const shakeIntensity = (animation.intensity || 5) * 2;
					frames = [
						{ transform: 'translateX(0)', offset: 0 },
						{ transform: `translateX(-${shakeIntensity}px)`, offset: 0.1 },
						{ transform: `translateX(${shakeIntensity}px)`, offset: 0.2 },
						{ transform: `translateX(-${shakeIntensity}px)`, offset: 0.3 },
						{ transform: `translateX(${shakeIntensity}px)`, offset: 0.4 },
						{ transform: `translateX(-${shakeIntensity}px)`, offset: 0.5 },
						{ transform: `translateX(${shakeIntensity}px)`, offset: 0.6 },
						{ transform: `translateX(-${shakeIntensity}px)`, offset: 0.7 },
						{ transform: `translateX(${shakeIntensity}px)`, offset: 0.8 },
						{ transform: `translateX(-${shakeIntensity}px)`, offset: 0.9 },
						{ transform: 'translateX(0)', offset: 1 }
					];
					break;
				}
				case 'pulse': {
					const pulseScale = scale || 1.05;
					frames = [
						{ transform: 'scale(1)', offset: 0 },
						{ transform: `scale(${pulseScale})`, offset: 0.5 },
						{ transform: 'scale(1)', offset: 1 }
					];
					break;
				}
				default:
					return null;
			}
			// 基底transform（中央寄せ等）を各フレームに合成して保持する
			if ( frames && baseTransform ) {
				frames = frames.map( ( f ) => ( { ...f, transform: composeTransform( f.transform ) } ) );
			}
			return frames;
		}

		// スタイルアニメーション用の変数
		let styleAnimation = null;

		// マウスエンター時
		element.addEventListener('mouseenter', () => {
			isHovering = true;

			// 文字色・背景色変更用クラスを追加（CSS処理）
			if (hoverColor || hoverBgColor) {
				element.classList.add('is-hover-active');
			}

			// 前のアニメーションをキャンセル
			if (currentAnimation) {
				currentAnimation.cancel();
			}
			if (styleAnimation) {
				styleAnimation.cancel();
			}
			if (overlayAnimation) {
				overlayAnimation.cancel();
			}

			// 基底transform（中央寄せ等のCSS transform）を取得。以降のホバーキーフレームはこの上に合成する
			baseTransform = readBaseTransform();

			// オーバーレイアニメーション
			if (overlayElement) {
				overlayAnimation = overlayElement.animate([
					{ opacity: 0 },
					{ opacity: hoverOverlayOpacity }
				], {
					duration: duration,
					easing: easing,
					fill: 'forwards'
				});
			}

			const continuousKeyframes = getContinuousKeyframes();
			if (continuousKeyframes) {
				// bounce, shake, pulseは繰り返しアニメーション
				currentAnimation = element.animate(continuousKeyframes, {
					duration: duration,
					easing: easing,
					iterations: type === 'pulse' ? Infinity : 1
				});

				// スタイル変更も同時に適用
				const styleKeyframes = getStyleOnlyKeyframes();
				if (styleKeyframes) {
					styleAnimation = element.animate(styleKeyframes, {
						duration: duration,
						easing: easing,
						fill: 'forwards'
					});
				}
			} else {
				// その他は単発トランジション
				const keyframes = getHoverKeyframes();
				currentAnimation = element.animate(keyframes, {
					duration: duration,
					easing: easing,
					fill: 'forwards'
				});
			}
		});

		// マウスリーブ時
		element.addEventListener('mouseleave', () => {
			isHovering = false;

			// 文字色・背景色変更用クラスを削除（CSS処理）
			if (hoverColor || hoverBgColor) {
				element.classList.remove('is-hover-active');
			}

			if (currentAnimation) {
				currentAnimation.cancel();
			}
			if (styleAnimation) {
				styleAnimation.cancel();
			}
			if (overlayAnimation) {
				overlayAnimation.cancel();
			}

			// オーバーレイを元に戻す
			if (overlayElement) {
				overlayAnimation = overlayElement.animate([
					{ opacity: hoverOverlayOpacity },
					{ opacity: 0 }
				], {
					duration: duration,
					easing: easing,
					fill: 'forwards'
				});
			}

			// 元の状態に戻すアニメーション
			const continuousKeyframes = getContinuousKeyframes();
			if (continuousKeyframes) {
				// bounce/shake/pulseの場合はスタイルのみ戻す
				const styleKeyframes = getStyleOnlyKeyframes();
				if (styleKeyframes) {
					styleAnimation = element.animate(styleKeyframes.slice().reverse(), {
						duration: duration,
						easing: easing,
						fill: 'forwards'
					});

					styleAnimation.onfinish = () => {
						// hoverBgColor, hoverColorはCSS方式で処理
						if (hoverBorderColor) {
							element.style.borderColor = originalStyles.borderColor;
							element.style.borderWidth = originalStyles.borderWidth;
							element.style.borderStyle = originalStyles.borderStyle;
						}
						if (hoverBoxShadow) {
							element.style.boxShadow = '';
						}
					};
				}
			} else {
				// トランジション系は逆再生で戻す
				const keyframes = getHoverKeyframes();
				currentAnimation = element.animate(keyframes.slice().reverse(), {
					duration: duration,
					easing: easing,
					fill: 'forwards'
				});

				currentAnimation.onfinish = () => {
					// アニメーション完了後、スタイルをリセット
					element.style.transform = originalStyles.transform;
					// hoverBgColor, hoverColorはCSS方式で処理
					if (hoverBorderColor) {
						element.style.borderColor = originalStyles.borderColor;
						element.style.borderWidth = originalStyles.borderWidth;
						element.style.borderStyle = originalStyles.borderStyle;
					}
					if (hoverBoxShadow) {
						element.style.boxShadow = '';
					}
				};
			}
		});

		// scroll/loadトリガーがない場合は、初期状態を表示
		if (!hasScrollOrLoadTrigger) {
			element.style.visibility = 'visible';
			element.style.opacity = '1';
			element.classList.add('is-animated');
		}
	}

	/**
	 * ページ読み込みトリガーを設定
	 */
	function setupLoadAnimation(element, animation) {
		element.setAttribute('data-animation-trigger', 'load');

		const runAnimation = () => {
			const delay = animation.delay || 0;
			setTimeout(() => {
				playAnimation(element, animation);
			}, delay);
		};

		if (document.readyState === 'loading') {
			document.addEventListener('DOMContentLoaded', runAnimation);
		} else {
			runAnimation();
		}
	}

	/**
	 * クリックトリガーを設定
	 */
	function setupClickAnimation(element, animation) {
		element.style.visibility = 'visible';
		element.style.opacity = '1';
		element.classList.add('is-animated');

		element.addEventListener('click', () => {
			playAnimation(element, animation);
		});
	}

	/**
	 * アニメーションを初期化
	 */
	function initAnimations() {
		const elements = document.querySelectorAll('.has-animation[data-animations]');

		elements.forEach((element) => {
			if (element.hasAttribute('data-animation-initialized')) {
				return;
			}
			element.setAttribute('data-animation-initialized', 'true');

			try {
				const animations = JSON.parse(element.getAttribute('data-animations'));

				if (!Array.isArray(animations) || animations.length === 0) {
					return;
				}

				// 現在のデバイスで適用するアニメのみ処理（デバイス別ON/OFF）。
				// 非該当はsetupしない＝data-animation-trigger属性が付かず、CSSのopacity:0条件から外れて表示される。
				const applicable = animations.filter(animAppliesToDevice);
				if (applicable.length === 0) {
					return;
				}

				// スクロール/loadトリガーがあるか判定
				const hasScrollTrigger = applicable.some((a) => a.trigger === 'scroll');
				const hasLoadTrigger = applicable.some((a) => a.trigger === 'load');

				// 各アニメーション設定を処理
				applicable.forEach((animation) => {
					switch (animation.trigger) {
						case 'scroll':
							setupScrollAnimation(element, animation);
							break;
						case 'hover':
							setupHoverAnimation(element, animation, hasScrollTrigger || hasLoadTrigger);
							break;
						case 'load':
							setupLoadAnimation(element, animation);
							break;
						case 'click':
							setupClickAnimation(element, animation);
							break;
						default:
							console.warn('Unknown animation trigger:', animation.trigger);
					}
				});
			} catch (e) {
				console.error('Animation parse error:', e);
			}
		});
	}

	// prefers-reduced-motion対応
	function shouldReduceMotion() {
		return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	}

	// 初期化
	function init() {
		// reduced-motionの場合は、要素を表示状態にしてアニメーションをスキップ
		if (shouldReduceMotion()) {
			const elements = document.querySelectorAll('.has-animation[data-animations]');
			elements.forEach((element) => {
				element.style.visibility = 'visible';
				element.style.opacity = '1';
				element.classList.add('is-animated');
				element.setAttribute('data-animation-initialized', 'true');
			});
			return;
		}

		initAnimations();
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}

	// リサイズでデバイスが切り替わった時の安全網:
	// その幅で表示系(scroll/load)アニメが適用されない要素は、確実に表示する（真っ白防止）
	let flavorAnimResizeTimer;
	window.addEventListener('resize', () => {
		clearTimeout(flavorAnimResizeTimer);
		flavorAnimResizeTimer = setTimeout(() => {
			const els = document.querySelectorAll('.has-animation[data-animations]');
			els.forEach((element) => {
				let anims;
				try { anims = JSON.parse(element.getAttribute('data-animations')); } catch (e) { return; }
				if (!Array.isArray(anims)) return;
				const hasReveal = anims.some((a) =>
					(a.trigger === 'scroll' || a.trigger === 'load') && animAppliesToDevice(a)
				);
				if (!hasReveal) {
					element.setAttribute('data-animation-trigger', 'none');
					element.classList.add('is-animated');
					element.style.visibility = 'visible';
					element.style.opacity = '1';
				}
			});
		}, 200);
	});

	// 動的に追加された要素への対応（MutationObserver）
	const mutationObserver = new MutationObserver((mutations) => {
		if (shouldReduceMotion()) return;

		mutations.forEach((mutation) => {
			mutation.addedNodes.forEach((node) => {
				if (node.nodeType === Node.ELEMENT_NODE) {
					if (node.classList && node.classList.contains('has-animation') && node.hasAttribute('data-animations')) {
						if (!node.hasAttribute('data-animation-initialized')) {
							initAnimations();
						}
					}
					const animatedChildren = node.querySelectorAll && node.querySelectorAll('.has-animation[data-animations]:not([data-animation-initialized])');
					if (animatedChildren && animatedChildren.length > 0) {
						initAnimations();
					}
				}
			});
		});
	});

	mutationObserver.observe(document.body, {
		childList: true,
		subtree: true
	});
})();
