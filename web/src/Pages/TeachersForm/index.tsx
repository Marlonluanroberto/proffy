import React, { useState, FormEvent } from 'react';
import PageHeader from '../../Components/PageHeader';
import { useHistory } from 'react-router-dom';
import './styles.css';
import Input from '../../Components/Input';
import warningIcon from '../../Assets/images/icons/warning.svg';
import Textarea from '../../Components/TextArea';
import Select from '../../Components/Select';
import api from '../../services/api';


function TeachersForms() {
    const history = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');
    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, from: '', to: '' }
    ]);


    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            { week_day: 0, from: '', to: '' }
        ]);
    }


    function setScheduleItemValue(position: Number, field: string, value: string) {
        const updateScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if (index === position) {
                return { ...scheduleItem, [field]: value };
            }
            return scheduleItem;
        });
        setScheduleItems(updateScheduleItems);
    }

    function createClasses(e: FormEvent) {
        e.preventDefault();

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(() => {
            try {
                alert('Cadastrado com sucesso');
                history.push('/');

            } catch (error) {

                alert('Ocorreu um erro');
            }
        })
        console.log({
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            scheduleItems
        });


    }

    return (
        <div id="page-teacher-form" className="container">

            <PageHeader
                title="Que incrível que você quer dar aulas."
                description="O primeiro passo, é preencher esse  formulário de inscrição." />
            <main>
                <form onSubmit={createClasses}>

                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input label="Nome Completo" name="name" value={name} onChange={(e) => { setName(e.target.value) }} />
                        <Input label="Avatar" name="avatar" value={avatar} onChange={(e) => { setAvatar(e.target.value) }} />
                        <Input label="Whatsapp" name="whatsapp" value={whatsapp} onChange={(e) => { setWhatsapp(e.target.value) }} />
                        <Textarea label="Biografia" name="bio" value={bio} onChange={(e) => { setBio(e.target.value) }} />

                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <Select label="Matéria" name="subject"
                            options={[
                                { value: "Artes", label: "Artes" },
                                { value: "Biologia", label: "Biologia" },
                                { value: "Ciências", label: "Ciências" },
                                { value: "Educação fisica", label: "Educação fisica" },
                                { value: "Fisica", label: "Fisica" },
                                { value: "Geografia", label: "Geografia" },
                                { value: "Historia", label: "História" },
                                { value: "Matématica", label: "Matématica" },
                                { value: "Português", label: "Português" },
                                { value: "Química", label: "Química" }
                            ]}
                            value={subject}
                            onChange={(e) => { console.log(e.target.value); setSubject(e.target.value) }} />

                        <Input label="Custo da sua hora por aula" name="cost" value={cost} onChange={(e) => { setCost(e.target.value) }} />

                    </fieldset>

                    <fieldset>
                        <legend>Horários disponíveis
                        <button type="button" onClick={addNewScheduleItem}>
                                + Novo horário
                        </button>
                        </legend>
                        {scheduleItems.map((scheduleItem, index) => {
                            return (

                                <div key={scheduleItem.week_day} className="schedule-item" >
                                    <Select label="Dia da semana" name="week_day"
                                        options={[
                                            { value: "0", label: "Domingo" },
                                            { value: "1", label: "Segunda-Feira" },
                                            { value: "2", label: "Terça-Feira" },
                                            { value: "3", label: "Quarta-Feira" },
                                            { value: "4", label: "Quinta-Feira" },
                                            { value: "5", label: "Sexta-Feira" },
                                            { value: "6", label: "Sábado" },
                                        ]}
                                        value={scheduleItem.week_day}
                                        onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)} />

                                    <Input name="from" label="Das" type="time" value={scheduleItem.from} onChange={e => setScheduleItemValue(index, 'from', e.target.value)} />
                                    <Input name="to" label="Até" type="time" value={scheduleItem.to} onChange={e => setScheduleItemValue(index, 'to', e.target.value)} />

                                </div>
                            );
                        })}
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso Importante" />
                        Importante!     <br />

                        Preencha todos os dados
                    </p>
                        <button type="submit">
                            Salvar Cadastro
                    </button>
                    </footer>
                </form>
            </main>

        </div>
    );
};

export default TeachersForms;