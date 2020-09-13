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
  const autocompleteInput = $('.input-autocomplete input');

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

  $(document).on('click', '#add-review .search-results li', function (e) {
    autocompleteInput.val($(this).data('title'));
    $('[name=post_id]').val($(this).data('id'));
  });
});
