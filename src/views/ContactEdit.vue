<template>
    <div v-if="contact" class="page">
        <h4>Hiệu chỉnh liên hệ</h4>
        <ContactForm 
            :contact="contact"
            @submit:contact="updateContact"
            @delete:contact="deleteContact"
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
    props: {
        id: {type: String, required: true},
    },
    data(){
        return {
            contact: null,
            message: "",
        };
    },
    methods: {
        async getContact(id){
            try{
                this.contact = await ContactService.get(id);
            }catch (error){
                console.log(error);
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$router.query,
                    hash: this.$route.hash,
                });
            }
        },
        async updateContact(data){
            try{
                await ContactService.update(this.contact._id, data);
                this.message="Liên hệ được cập nhật thành công.";
            }catch (error){
                console.log(error);
            }
        },
        async deleteContact(){
            if(confirm("Bạn muốn xoá Liên hệ này?")){
                try{
                    await ContactService.delete(this.contact._id);
                    this.$router.push({name: "contactbook"});
                }catch (error){
                    console.log(error);
                }
            }
        }
    },
    created(){
        this.getContact(this.id);
        this.message = "";
    },
};
</script>