<template>
    <div class="page">
        <h4>Thêm liên hệ mới</h4>
        <ContactForm 
            :contact="{}"
            @submit:contact="createContact"
        />
        <p>{{ message }}</p>
    </div>
</template>
<script>
import ContactService from '@/services/contact.service';
import ContactForm from '@/components/ContactForm.vue';
export default {
    components: {
        ContactForm,
    },
    data(){
        return {
            message: "",
        };
    },
    methods: {
        async createContact(data){
            try{
                await ContactService.create(data);
                this.message="Liên hệ được thêm thành công.";
            }catch (error){
                console.log(error);
            }
        }
    },
    created(){
        this.message = "";
    },
};
</script>