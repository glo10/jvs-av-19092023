import AuthUserStore from '../../../../4-exercice/correction/src/js/auth-user-store'
import jQuery from 'jquery'
import './jquery-plugin'

export default class AuthUserJQuery extends AuthUserStore {
  checkData () {
    jQuery(function () { // chargement du document
      jQuery('form input')
        .validation()
        .fadeOutRemove()
    })
  }

  async connectedCallback () {
    await super.connectedCallback()
    this.checkData()
  }
}
customElements.define('auth-user-jquery', AuthUserJQuery)
