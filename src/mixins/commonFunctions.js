export default {
    methods: {
        getGridData(inputGridName){
            const result = this.experimentObject?.resultGrids?.find?.(({gridName}) => gridName === inputGridName);
            return result;
        },
        getProperty(property){
            const objectWithProperty = this.experimentObject?.generalInfo?.find?.(object => object.id === property);
            if(!objectWithProperty) return;
            return objectWithProperty?.value;
        },
        getColumnText(arrayOfColumns, searchColumn){
            const object = arrayOfColumns.find(({id}) => id === searchColumn)
            return object.text;
        },
        incrementPageNumber(){
            let pageNumber = this.getPageNumber();
            pageNumber = parseInt(pageNumber);
            localStorage.setItem('pageNumber', pageNumber + 1);
        },
        getPageNumber(){
            const pageNumber = localStorage.getItem('pageNumber');
            if(isNaN(pageNumber)) return 1;
            return pageNumber;
        },
        createPageNumber(){
            this.incrementPageNumber();
            return this.getPageNumber();
        },
        deletePageNumber(){
            localStorage.removeItem('pageNumber');
        },

        toPersian(inputInEnglish){
            if(!inputInEnglish) return;
            const id = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
            let inputInPersian = inputInEnglish.toString().replace(/[0-9]/g, w => id[+w]);
            return inputInPersian;
        },

        toEnglish(inputInPersian){
            if(!inputInPersian) return;
            const id= ['0','1','2','3','4','5','6','7','8','9'];
            const id1= ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
        
            return inputInPersian.replace(/,/g, "").replace(/[۰-۹]/g, function(w){
                return id[id1.indexOf(w)];
            });
        },

        padDate(dateInput){
            if(!dateInput) return;
            const [year, mm, dd] = dateInput.split('/');
            const padMonth = mm.padStart(2, '۰');
            const padDay = dd.padStart(2, '۰');
            return `${year}/${padMonth}/${padDay}`;
        },

        seperateArrayByNumber(inputArray, seperateBy){
            if(inputArray.length === 0) return;
            const itemsCount = Math.ceil(inputArray.length / seperateBy);
            const result = [];
            for(let itemIndex = 0; itemIndex < itemsCount; itemIndex++){
                const tempResult = [];
                for(let secondIndex = 0; secondIndex < seperateBy; secondIndex++){
                    const actualIndex = itemIndex * seperateBy + secondIndex;
                    tempResult.push(inputArray[actualIndex]);
                }
                result.push(tempResult.filter(Boolean));
            }
            return result;
        },

        getPersianDate(inputEnglishDate = ''){
            const dateTime = inputEnglishDate ? inputEnglishDate : this.getCurrentDate();
            const inputInEnglish = this.toEnglish(dateTime).split(' ')[0];
            const dateInPersian = new Date(inputInEnglish).toLocaleDateString('fa-IR');
            return dateInPersian;
        },

        getCurrentDate(){
            const today = new Date();
        
            const dd = today.getDate().toString().padStart(2, '0');
            const mm = (today.getMonth() + 1).toString().padStart(2, '0');
            const yyyy = today.getFullYear();
        
            return `${yyyy}-${mm}-${dd}`;
        }
    }
}
