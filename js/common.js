jQuery(document).ready(function ($) {

  /**
   * Скрыть/Открыть текст
   */
  $('.btn-toggle-text').on('click', function () {
    const $this = $(this),
          span  = $this.find('span');
    let text = span.text();
    $this.toggleClass('active').prev('.hidden-text').toggleClass('open');
    span.text(text === 'Читать далее' ? 'Скрыть' : 'Читать далее');
  });

  /**
   * Аккордион
   */
  $('.question').on('click', function () {
    let thisParent   = $(this).closest('.faq'),
        otherParents = thisParent.siblings();
    otherParents.find('.question').removeClass('active').next('.answer').slideUp();
    thisParent.find('.question').toggleClass('active').next('.answer').slideToggle();
  });

  /**
   * Показать/Скрыть Категории
   */
  $('.btn-cat-lists').on('click', function () {
    const $this = $(this),
          span  = $this.find('span');
    let text = span.text();
    $this.toggleClass('active').prev('.cat-lists').slideToggle();
    span.text(text === 'Все продукты' ? 'Скрыть' : 'Все продукты');
  });


  /**
   * Выпадающее меню
   */
  $('#nav > ul > li').on('mouseenter', function () {
    $('#page').append('<div class="overlay"></div>')
  });

  /**
   * Autocomplete form
   */
  const autocompleteInput = $('.input-autocomplete input, .quick-search-form input');

  autocompleteInput.on('blur', function () {
    let $this = $(this);

    setTimeout(function () {
      $this.closest('form').find('.search-results').removeClass('active');
      $('.btn-clear').fadeOut();
    }, 100)
  });


  $('.btn-clear').on('click', function () {
    autocompleteInput.val('');
  });

  autocompleteInput.on('input focus', function () {
    if ($(this).val().length > 2) {
      $('.btn-clear').fadeIn();
      $('.search-results').addClass('active');
    }
  });

  $(document).on('click', '#add-review .search-results li', function () {
    autocompleteInput.val($(this).data('title'));
    $('[name=post_id]').val($(this).data('id'));
  });

  /**
   * Дроп списки
   */
  $(document).on('click', '.btn-drop-toggle', function () {
    const $this = $(this);
    $this.toggleClass('active');
    $this.closest('div').siblings().find('.btn-drop-toggle, .drop-list').removeClass('active');
    $this.closest('div').find('.drop-list').toggleClass('active');
  });

  $(document).on('click input', function (event) {
    if (check_drop_list($(event.target))) return;
    $('.drop-list').removeClass('active');
    $('.btn-drop-toggle').removeClass('active');
    event.stopPropagation();
  });

  function check_drop_list(el) {
    return el.hasClass("btn-drop-toggle") || el.closest('.btn-drop-toggle').length || el.is('input') || el.closest('.drop-list').length;
  }

  /**
   * Скрыть списко после выбора в фильтре
   */
  $('.filter-select .drop-list .checkbox').on('click', function () {
    const $this        = $(this),
          $thisVal     = $this.find('span').text(),
          filterSelect = $this.closest('.filter-select');

    if (filterSelect.hasClass('multiselect')) {

    } else {
      filterSelect.find('.selected-value').text($thisVal);
      filterSelect.find('.drop-list, .btn-drop-toggle').removeClass('active');
    }
  });

  $('.filter-select input[type=text]').on('input', function () {
    const $this = $(this);
    let val = $this.val() ? $this.val() + ' руб' : 'Любая';
    $this.closest('.filter-select').find('.selected-value').text(val);
  });

  /**
   * Ползунок в инпутах
   */
  $('.input-slider').each(function () {
    let $this  = $(this),
        $input = $this.closest('.input-with-slider').find('input'),
        min    = $this.data('min') || 5000,
        max    = $this.data('max') || 30000,
        value  = $this.data('value') || 10000,
        step   = $this.data('step') || 500,
        $join  = $this.data('join') || 'Р';

    $this.slider({
      range: 'min',
      animate: "fast",
      step, min, max, value,
      slide: function (event, ui) {
        if ($join.indexOf('месяц') !== -1) {
          $join = num2str(Number(ui.value), ['месяц', 'месяца', 'месяцев']);
        } else if ($join !== '₽') {
          $join = num2str(Number(ui.value), ['день', 'дня', 'дней']);
        }
        $input.val(ui.value + ' ' + $join);
      },
      change: function () {
        calc_credit_cards($input);
      }
    });

    $input.val($this.slider('value') + ' ' + $join);

    $input.on('input', function () {
      $this.slider('value', $(this).val());
    });

  });

  if ($('.calc').length) {
    calc_credit_cards($('.slider-sum'));
  }

  /**
   * Показать график
   */
  $('.btn-schedule').on('click', function () {
    $('.payment-schedule').slideToggle();
  });

  /**
   * Кнопка с анкором
   */
  $('.btn-anchor').on('click', function (e) {
    let $this = $(this);
    let href = $this.attr('href');

    if (!$(href).length) {
      return;
    }
    $this.closest('li').addClass('active').siblings().removeClass('active');

    e.preventDefault();

    let blockOffset = $(href).offset().top;

    $('html, body').animate({
      scrollTop: blockOffset
    }, 500);
  });

  /**
   * Слайдер продуктов
   */
  $('.slider-products').slick({
    dots: false,
    arrows: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      },
    ]
  });

  /**
   * Слайдер элементов в моб версии
   */
  $('.slider-items').slick({
    dots: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  });

  /**
   * Подсказка моб
   */
  $('.icon-hint').on('click', function (e) {
    $(this).closest('.hint').toggleClass('active').find('.hint-text').slideToggle();
  });

  $(document).on('click', function (e) {
    if ($(e.target).is('.icon-hint') || $(e.target).closest('.hint').length) return;
    $('.hint-text').fadeOut();
    $('.hint').removeClass('active');
    e.stopPropagation();
  });

  /**
   * Меню
   */

  /**
   * Меню для мобильного
   */
  $('.btn-menu').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('active').next().slideToggle()
  })

  const menuA = $('#nav a');
  menuA.each(function () {
    if ($(this).closest('li').find('ul').length) {
      $(this).append(' <i class="icon-arr"></i>')
    }
  });

  menuA.on('click', function (e) {
    if ($(window).width() < 1199) {
      let thisParent = $(this).closest('li'),
          ul         = thisParent.find('> div');
      if (ul.length > 0) {
        e.preventDefault();
        thisParent.toggleClass('open').siblings().removeClass('open').find('> div').slideUp();
        ul.slideToggle();
      }
    }
  });

  /**
   * Табы в карточке
   */
  const endpoints = $('.endpoint-names');

  if (endpoints.length && $(window).width() < 1200) {
    const fixedScroll = endpoints.offset().top;

    $(document).on('scroll', function () {
      $(window).scrollTop() > fixedScroll ? endpoints.addClass('fixed') : endpoints.removeClass('fixed');
    })

  }
});

/**
 * Калькулятор
 * @param $input
 */
function calc_credit_cards($input) {
  let $form         = $input.closest('.calc'),
      percent       = Number($form.data('percent')) / 100,
      sum           = Number($form.find('.slider-sum').slider('value')),
      months        = Number($form.find('.slider-months').slider('value')),
      repayment_sum = calc_credit_card_sum(sum, months, percent),
      month_payment = Math.ceil(repayment_sum / months),
      current_date  = new Date();

  current_date.setMonth(current_date.getMonth() + months);

  $form.find('.repayment').text(repayment_sum + ' ₽');
  $form.find('.repayment-date').text(formatDate(current_date));
  $form.find('.month-payment').text(month_payment + ' ₽');
  $form.find('.overpayment').text(repayment_sum - sum);

  let table_data = build_schedule(repayment_sum, months, month_payment, percent);

  $('.payment-schedule tbody').html('');
  table_data.forEach(function (el) {
    $('.payment-schedule tbody').append('<tr><td>' + el["number"] + ' </td><td>' + el["month_payment"] + ' </td><td>' + el["payment_percent"] + ' </td><td>' + el["sum"] || 0 + ' </td></tr>')
  });
}

/**
 * Считаем сумму для кредитной карты
 */

function calc_credit_card_sum(sum, period, percent) {
  let end_sum = sum;
  percent /= 12;

  for (let i = 1; i <= period; i++) {
    end_sum += end_sum * percent;
  }

  return Math.round(end_sum);
}

function build_schedule(sum, months, month_payment, percent) {
  const whole_sum = sum;
  let table = [];

  for (let i = 1; i <= months; i++) {
    let tr = { 'number': '', month_payment, 'payment_percent': 0, sum };
    tr['sum'] = Math.ceil(whole_sum - month_payment * i);

    if (tr['sum'] < 0) {
      tr['sum'] = 0;
    }

    tr['payment_percent'] = month_payment + ' + ' + Math.ceil(tr['sum'] * percent / 12);

    let current_date = new Date();
    current_date.setMonth(current_date.getMonth() + i);

    tr['number'] = '№' + i + ' ' + formatDate(current_date);
    table.push(tr);
  }

  return table;
}

/**
 * Правильное склонение
 */
function num2str(n, text_forms) {
  n = Math.abs(n) % 100;
  let n1 = n % 10;
  if (n > 10 && n < 20) {
    return text_forms[2];
  }
  if (n1 > 1 && n1 < 5) {
    return text_forms[1];
  }
  if (n1 === 1) {
    return text_forms[0];
  }
  return text_forms[2];
}

/**
 * Форматирование даты
 * @param date
 * @returns {string}
 */
function formatDate(date) {

  let dd = date.getDate();
  if (dd < 10) dd = '0' + dd;

  let mm = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;

  let yy = date.getFullYear() % 100;
  if (yy < 10) yy = '0' + yy;

  return dd + '.' + mm + '.' + yy;
}

/**
 * Строим урл
 */
function build_get_query(uri, param_name, param_value) {
  if (param_value.length) {
    uri.searchParams.set(param_name, param_value.join('-'));
  } else {
    uri.searchParams.delete(param_name);
  }

  return uri;
}
