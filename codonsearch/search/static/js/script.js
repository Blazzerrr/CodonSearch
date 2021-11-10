$(document).ready(function(){
    $(document).on('click', '#submit', function() {
        var combination = $("#combination").val();
        combination = combination.replace(/\s/g, ''); // Remove spaces

        // Validation data
        // If combination is empty
        if (combination == '')
        {
            document.getElementById("result").innerHTML = '<div class="error"><p>Поле комбинации не может быть пустым</p></div>';
            return false;
        }

        // If length combination is not equal to 3 
        if (combination.length > 3 || combination.length < 3)
        {

            document.getElementById("result").innerHTML = '<div class="error"><p>Комбинация должна состоять из</br>3 нуклеотидов</p></div>';
            return false;
        }

        // If user send wrong nucleotide
        for (i = 0; i < combination.length; i++) 
            {
            if (combination[i].toUpperCase() != 'A' && combination[i].toUpperCase() != 'C' && combination[i].toUpperCase() != 'G' && combination[i].toUpperCase() != 'T') 
            {
                document.getElementById("result").innerHTML = '<div class="error"><p>Вы вводите недопустимую комбинацию нуклеотидов</br>Допустимые нуклеотиды: A, C, G, T</p></div>';
                return false;
            }
          }

        $.ajax(
        {
            url: 'search',
            type: 'get',
            data: {
                combination: combination
            },

            success: function(output)
            {
                keyStatus = Object.keys(output)[0]
                
                if (keyStatus == 'success') 
                {
                    document.getElementById("result").innerHTML = '<div class="good"><p>Найдено</p></div>';
                    return true;
                }

                if (keyStatus == 'fail') 
                {
                    document.getElementById("result").innerHTML = '<div class="error"><p>Не найдено</p></div>';
                    return false;
                }

                if (keyStatus == 'error') 
                {
                    document.getElementById("result").innerHTML = '<div class="error"><p>Ошибка</p></div>';
                    return false;
                } 
            }
        });
    });
});