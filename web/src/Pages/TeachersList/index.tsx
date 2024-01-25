import React, { useState, FormEvent } from 'react';
import './styles.css';
import PageHeader from '../../Components/PageHeader';
import TeacherItem, { Teacher } from '../../Components/TeacherItem';
import Input from '../../Components/Input';
import Select from '../../Components/Select';
import api from '../../services/api';
 

function TeachersList() {
    const [teachers, setTeachers] = useState([]);
    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    async function searchTeachers(e: FormEvent) {
        e.preventDefault();

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        });

        setTeachers(response.data);
    }

    return (

        <div id="page-teacher-list" className="container">
            <PageHeader title="Esses são os proffys disponiveis" >

                <form id="search-teachers" onSubmit={searchTeachers}>
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
                        value={subject} onChange={(e) => { setSubject(e.target.value) }}
                    />
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
                        value={week_day} onChange={(e) => { setWeekDay(e.target.value) }}
                    />
                    <Input type="time" name="time" label="Hora" value={time} onChange={(e) => { setTime(e.target.value) }} />

                    <button type="submit">
                        Buscar
                    </button>
                </form>

            </PageHeader>
            <main >
                {teachers.map((teacher: Teacher )=> {

                    return <TeacherItem key={teacher.id} teacher={teacher} />
                })}
            </main>
        </div>
    );
};

export default TeachersList;