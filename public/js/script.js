function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#foto')
                    .attr('src', e.target.result);
                    // .width(150)
                    // .style.height="50px"
                    // .height(200);
            };

            reader.readAsDataURL(input.files[0]);
        }
    }