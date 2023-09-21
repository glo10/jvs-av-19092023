import jQuery from 'jquery'

(function ($) { // une closure
  $.fn.checkName = function () { // vérification du prénom et nom
    return /^[a-z]+(?!_)(\s|-)?[a-z]+$/i.test($(this).val())
  }

  $.fn.checkAge = function () { // verification de l'age
    const age = +$(this).val() // + operator before string converts string to number
    return /^(1[0-2][0-9]|1[4-9]|[2-9][0-9]|130)$/.test(age)
  }

  $.fn.checkLocation = function () { // vérification de la ville et pays
    return /^[a-z]+(?!_)(\s|-)?[a-z0-9|\s]+$/i.test($(this).val())
  }

  $.fn.checkEmail = function () { // vérification email
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/.test($(this).val())
  }

  $.fn.checkPassword = function () { // vérification du mot de passe
    return /^(?!abcdef|qwerty|azerty|123456)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[&$+\-*\/#~€%^!-_]).{15,36}/.test($(this).val())
  }

  $.fn.check = function () { // agregateur de toutes les fonctions de vérification précédente
    const el = $(this).get(0).type ?? $(this).get(0).tagName // on recup type d'input ou son tag
    switch (el.toLowerCase()) {
      case 'option':
        return $(this).checkLocation()
      case 'number':
        return $(this).checkAge()
      case 'text':
        return $(this).checkName()
      case 'email':
        return $(this).checkEmail()
      case 'password':
        return $(this).checkPassword()
      default:
        throw new Error('Can\'t check data')
    }
  }

  $.fn.validation = function () { // gestion des événements et des vérifications
    $(this).on('keyup change', function () { // vérification à chaque lever de la touche du clavier
      const alertInfo = $(this).parent().find('.alert.alert-info')
      if (!$(this).check()) { // format incorrect
        const format = $(this).data('format') ?? 'Format incorrect'
        $(this).css({ 'border-color': 'red' })
        if (alertInfo.length === 0) { // Création d'un span pour afficher le message d'erreur
          $(this).parent().append(`<span class="alert alert-info">${format}</span>`)
          $(this).parent().find('.alert.alert-info')
            .animate({ bottom: '-10px' }, 'slow')
        }
      } else { // format correct
        $(this).css({ 'border-color': '#ced4da' })
        alertInfo
          .fadeOut(2000, () => {
            $(alertInfo).remove()
          })
      }
    })
    return $.fn
  }

  $.fn.fadeOutRemove = () => {
    $(this).on('blur', function () {
      const alertInfo = $(this).parent().find('.alert.alert-info')
      $(alertInfo).parent().find('.alert.alert-info')
        .fadeOut(3000, () => {
          $(alertInfo).remove()
        })
    })
    return $.fn
  }
}(jQuery))
