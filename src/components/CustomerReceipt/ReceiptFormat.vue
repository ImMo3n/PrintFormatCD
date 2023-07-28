<template>
    <div v-if="displayOriginal" data-template class="template position-relative d-flex flex-column" style="height: 293.1mm; width: 204mm;">
        <LogoWatermark />
        <ReceiptHeader />
        <main class="border flex-grow-1 d-flex flex-column">
            <div class="flex-grow-1">
                <table data-main-header class="table table-bordered table-sm m-0">
                    <thead>
                        <tr>
                            <th>نام مشتری: <span class="fw-normal">{{sampleExperimentPDData.FK_PERSON_ID_label}}</span></th>
                            <th>عکس گرفته شده <input type="checkbox" data-checkbox="photos-taken" /></th>
                            <th>تعداد کل اقلام آزمون: <span class="fw-normal">{{sampleCount}}</span></th>
                        </tr>
                        <tr>
                            <th colspan="2">کد نمونه: <span></span></th>
                            <th>تاریخ دریافت: <span class="fw-normal">{{this.getPersianDate(sampleExperimentPDData.SAMPLE_DATE_RECEIVED)}}</span></th>
                        </tr>
                    </thead>
                </table>
                <table class="table table-bordered m-0">
                    <thead data-main-table-header>
                        <tr>
                            <th class="border-end-0">ردیف</th>
                            <th>نوع نمونه</th>
                            <th>نام تجاری / مدل / شماره سریال</th>
                            <th class="border-start-0">اقلام جانبی</th>
                        </tr>
                    </thead>
                    <tbody data-table-rows class="table-rows">
                        <slot></slot>
                    </tbody>
                </table>
            </div>
            <div data-main-footer class="py-2 pe-2" style="gap: 4rem;">
                <div class="d-flex" style="gap: 5rem;">
                    <span> نمونه‌های ردیف </span>
                    <span> در تاریخ </span>
                    <span> به صورت سالم و کامل با کلیه متعلقات تحویل اینجانب </span>
                    <span>گردید.</span>
                    <span>امضاء</span>
                </div>

                <div class="d-flex" style="gap: 5rem;">
                    <span> گزارش آزمون در تاریخ </span>
                    <span> تحویل داده شد. </span>
                </div>
            </div>
        </main>
        <ReceiptFooter />
    </div>
    <div v-html="printHTML"></div>
</template>

<script>
    import ReceiptHeader from './ReceiptHeader.vue';
    import ReceiptFooter from './ReceiptFooter.vue';
    import LogoWatermark from '../LogoWatermark.vue';

    export default {
        name: 'ReceiptFormat',
        props: ['sampleExperimentPDData'],
        emits: ['loaded'],
        components: {
          ReceiptHeader,
          ReceiptFooter,
          LogoWatermark,
        },
        data(){
            return {
                contents: [],
                templateHTML: '',
                printHTML: '',
                displayOriginal: true,
                delay: 1000,
                // isLoading: true,
            }
        },
        computed: {
            sampleCount(){
                if(this.sampleExperimentPDData.SAMPLES){
                    return this.toPersian(Object.values(this.sampleExperimentPDData.SAMPLES).length);
                }
            }
        },
        methods: {
            getContents(){
                const rowsSelection = document.querySelector('[data-table-rows]').children;
                const rowsHTML = Object.values(rowsSelection);
                return rowsHTML;
            },
            addTemplateWithContentToDOM(arrayOfArrayOfContents){
                arrayOfArrayOfContents.forEach(arrayOfContents => {
                    arrayOfContents = arrayOfContents.map(content => content.cloneNode(true));
                    const templateString = this.templateHTML;
                    const domElement = new DOMParser().parseFromString(templateString, "text/html").querySelector('[data-template]');
                    arrayOfContents.forEach(content => {
                        domElement.querySelector('.table-rows').appendChild(content);
                    })
                    const newTemplateString = domElement.outerHTML;
                    this.printHTML = this.printHTML.concat(newTemplateString);
                });
            },
            getTemplate(){
                const template = document.querySelector('[data-template]').cloneNode(true);
                template.querySelector('.table-rows').innerHTML = '';
                return template.outerHTML;
            },
            getHeightLimit(){
                const templateHeight = document.querySelector('[data-template]').clientHeight;
                const headerHeight = document.querySelector('header').clientHeight;
                const footerHeight = document.querySelector('footer').clientHeight;
                const mainFooterHeight = document.querySelector('[data-main-footer]').clientHeight;
                const mainHeaderHeight = document.querySelector('[data-main-header]').clientHeight;
                const mainTableHeaderHeight = document.querySelector('[data-main-table-header]').clientHeight;

                const heightLimitOfMainElement = templateHeight - (headerHeight + footerHeight + mainFooterHeight + mainHeaderHeight + mainTableHeaderHeight);
                return heightLimitOfMainElement;
            },
            seperateContentsBasedOnHeightLimit(){
                const heightLimit = this.getHeightLimit();
                const arrayOfArrayOfContents = [];
                this.contents.reduce((contents, currentContent, index) => {
                    const previousContentsHeight = getContentsHeight(contents);
                    const currentContentHeight = currentContent.clientHeight;
                    if(previousContentsHeight + currentContentHeight > heightLimit){
                        if(contents.length === 0) this.$emit('Error:LargeElement');
                        arrayOfArrayOfContents.push(contents);
                        contents = [];
                    }
                    contents.push(currentContent);
                    if(index === this.contents.length - 1) arrayOfArrayOfContents.push(contents);
                    return contents;

                    function getContentsHeight(contentsArray){
                        if(contentsArray.length === 0) return 0;
                        return contentsArray.map(content => content.clientHeight)
                            .reduce((sumHeight, contentHeight) => {
                                return sumHeight + contentHeight;
                            }, 0);
                    }
                }, []);
                return arrayOfArrayOfContents;
            },
            applyPageNumber(){
                setTimeout(() => {
                    const templates = Object.values(document.querySelectorAll('[data-template]'));
                    const pageCountAll = this.toPersian(templates.length);
                    templates.forEach((template, index) => {
                        const pageNumberElement = template.querySelector('[data-page-number]');
                        const pageNumberAllElement = template.querySelector('[data-page-number-all]');
                        pageNumberElement.innerText = this.toPersian(index + 1);
                        pageNumberAllElement.innerText = pageCountAll;
                    });
                    
                    this.$emit('loaded');
                }, this.delay);
            },
            listenerToCheckboxes(){
                const checkboxElements = Object.values(document.querySelectorAll('[type="checkbox"]'));
                checkboxElements.forEach(element => {
                    element.addEventListener('click', event => {
                        const checkboxClicked = event.target.getAttribute('data-checkbox');
                        const isChecked = event.target.checked;
                        const checkboxesWithSameAttribute = Object.values(document.querySelectorAll(`[data-checkbox="${checkboxClicked}"]`));
                        checkboxesWithSameAttribute.forEach(element => {
                            element.checked = isChecked;
                        });
                    });
                });
            },
            
        },
        mounted(){
            window.addEventListener('load', () => {
                setTimeout(() => {
                    this.contents = this.getContents();
                    this.templateHTML = this.getTemplate();
                    const arrayOfArrayOfContents = this.seperateContentsBasedOnHeightLimit();
                    this.addTemplateWithContentToDOM(arrayOfArrayOfContents);
                    if(this.contents.length) this.displayOriginal = false;
                    this.applyPageNumber();
                    this.listenerToCheckboxes();
                }, this.delay);
            });
        }
    }
</script>

<style scoped>
    th {
        font-size: 12px;
    }

    span {
        font-size: 14px;
    }

    .no-print{
        right: calc(204mm + 5%);
    }

</style>
