function cardAppend(data) {
	$('.card').append(`<div class="col-sm-6 col-md-4">
                 <div class="thumbnail">
                   <div class="image">
                      <div class="image"><img src="img/${data.image}.png" class="card-img img img-responsive" alt="..."></div>
                  </div>
                   <div class="caption">
                      <h5 class="name">${data.name}</h3>
                      <p class="price">${data.price}</p>
                  </div>
              </div>
            </div>`);
}

$(document).ready(function() {
	$.get('https://json-project3.herokuapp.com/products', function(data) {
        // console.log(data)
        
		for (let i = 0; i < data.length; i++) {
			cardAppend(data[i]);
        }
        
		$('.menuItem').each(function(index) {
			let filterBy = $(this).attr('filterBy').toLowerCase();

			if (filterBy !== '') {
				let filterValue = $(this).attr('filterValue').toLowerCase();
				let counter = 0;
				for (let i = 0; i < data.length; i++) {
					if (data[i][filterBy].toLowerCase() == filterValue) {
						counter++;
					}
				}

				$(this).next().text(counter);
			} else {
				$(this).next().text(data.length);
			}
		});

		$('.menuItem').on('click', function() {
			$('.menuItem.active').next().removeClass('active1');
			$('.menuItem.active').next().removeClass('hover-active1');
			$('.menuItem.active').removeClass('hover-active');
			$('.menuItem.active').removeClass('active');

			$(this).addClass('active');
			$(this).next().addClass('active1');
			$('.card').html('');
			let filterBy = $(this).attr('filterBy').toLowerCase();
			let filterValue = $(this).attr('filterValue').toLowerCase();

			for (let i = 0; i < data.length; i++) {
				if (filterBy == '' || data[i][filterBy].toLowerCase() == filterValue) {
					// console.log(filterBy);
					cardAppend(data[i]);
				}
			}
		});
		$('.menuItem').on('mouseover', function() {
			if (!$(this).hasClass('active')) {
				$(this).addClass('hover-active');
				$(this).next().addClass('hover-active1');
			}
		});
		$('.menuItem').on('mouseout', function() {
			if (!$(this).hasClass('active')) {
				$(this).removeClass('hover-active');
				$(this).next().removeClass('hover-active1');
			}
		});
		$('.thumbnail').on('mouseover', function() {
			$(this).css({ border: '1px solid orange' });
		});
		$('.thumbnail').on('mouseout', function() {
			$(this).css({ border: '1px solid #777' });
		});
		$('.image').on('mouseover', function() {
			$(this).css({ transform: 'scale(1.05)' });
		});
		$('.image').on('mouseout', function() {
			$(this).css({ transform: 'scale(1.0)' });
		});
		$('.footerMenuItem').on('mouseover', function() {
			$(this).css({ color: 'orange' });
		});
		$('.footerMenuItem').on('mouseout', function() {
			$(this).css({ color: '#777' });
		});
		$('.square').on('mouseover', function() {
			$(this).css({ 'background-color': '#777' });
		});
		$('.square').on('mouseout', function() {
			$(this).css({ 'background-color': 'orange' });
		});
	});
});
