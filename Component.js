//'use strict';

sap.ui.define(
  [
    'sap/ui/core/UIComponent',
    'sap/m/MessageBox'
  ],
  function(UIComponent, MessageBox) {
    //'use strict';

    return UIComponent.extend('namespace.Component', {
      metadata: {
        manifest: 'json' // подцепляем еастройки из манифеста
      },

      init: function () {
        // call the init function of the parent
        UIComponent.prototype.init.apply(this, arguments); // it is obligatory(обязательно) to make the super call        

        this.oMainModel = this.getModel('main'); // from manifest.json			
				
        this.oRouter = this.getRouter(); 
				this.oRouter.initialize(); // запускаем роутинг (берет настройки из манифеста)
        this.oRouter.attachBeforeRouteMatched(this._handleRout.bind(this)); // вообще не нужно, просто пример цепляния обрботчика события.
				// срабатывает перед тем, как произойдет обработка события совпадения URL 
					
				this._setMainmenu(); // формируем данные для главногог меню.
				
      },
			
			_setMainmenu: function(){
				let that = this;
				// Когда в модель подгрузятся даннве из файла JSON...
				this.oMainModel.dataLoaded().then(function(){			
					// берем список категорий...
					let aTypes = that.oMainModel.getProperty("/types");
					// формирукм дополнительные пункты меню...
					let aOtherMenuItems = [
						{
							id: "about",
							title: "О нас",
							nav: {
								rout: "about"
							}
						},
						{
							id: "busket",
							title: "Корзина",
							nav: {
								rout: "busket"
							}
						}
					];
					// объединяем два масива, чтобы получился 1 - будет меню...
					let aMenu = aTypes.concat(aOtherMenuItems);
					
					// добавляем в модель свойство, в котором хранится массив пунктов мею
					that.oMainModel.setProperty("/mainMenu", aMenu);
				});
				
			},
			_handleRout: function(oEvent){
				 // тут можно получить название роута, который только что сработал, но переход еще не осуществлен. Просто пример.
				 let sName = oEvent.getParameter("name"); 
				 //debugger;
			}
    
    });
  }
);
