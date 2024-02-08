import React from "react";

const Inner: React.FC = () => {
    // Создаем состояние для отслеживания того, открыт ли элемент FAQ
    const [openIndex, setOpenIndex] = React.useState<number | null>(null);

    // Функция для переключения состояния открытия/закрытия элемента
    const toggleElement = (index: number) => {
        setOpenIndex(prevIndex => (prevIndex === index ? null : index));
    };

    return (
        <div className="faq__content">
            {/* Маппинг элементов FAQ */}
            {faqData.map((faq, index) => (
                <div className="faq__content-element" key={index}>
                    <div
                        className="faq__content-element_headerblog"
                        onClick={() => toggleElement(index)} // Вызываем функцию переключения при нажатии
                    >
                        <h2 className="faq__content-element_header">{faq.question}</h2>
                        {/* Добавляем класс активности для кнопки крестика */}
                        <button className={`faq__content-element_headercross ${openIndex === index ? 'active' : ''}`}></button>
                    </div>
                    {/* Условный рендеринг текста FAQ с добавлением класса активности */}
                    <p className={`faq__content-element_text ${openIndex === index ? 'active' : ''}`}>
                        {faq.answer}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Inner;
// Данные FAQ (вместо статических данных можно использовать данные из API или базы данных)
const faqData = [
    {
        question: 'What is AXXIS?',
        answer: 'AXXIS is a digital marketplace for exclusive fashion items represented as Non-Fungible Tokens (NFTs). It combines luxury fashion with blockchain technology, offering a unique platform for buying, selling, and trading high-end fashion NFTs.',
    },
    {
        question: 'How do I purchase on AXXIS?',
        answer: 'To purchase NFTs on AXXIS, create an account, acquire AXXIS tokens during our presale or through the platform, and use them to buy NFTs from the NFT or Secondary/Celebrity Floors.',
    },
    {
        question: 'What makes AXXIS different from other NFT platforms?',
        answer: 'AXXIS specializes in fashion NFTs, providing exclusive access to high-end fashion items in digital form. Its unique access key system for brand-specific NFTs and specialized floors for trading and auctions set it apart.',
    },
    {
        question: 'Are my transactions secure on the platform?',
        answer: 'Yes, security is paramount at AXXIS. We employ advanced blockchain technology to ensure secure and transparent transactions.',
    },
    {
        question: 'Can I sell my NFTs on AXXIS?',
        answer: 'Absolutely. AXXIS provides a platform for users to resell their fashion NFTs on the Secondary and Celebrity Floors, subject to membership level and platform rules.',
    },
    {
        question: 'How do I get started?',
        answer: 'Join the AXXIS community by signing up on our website, participating in the token presale, and exploring our unique range of fashion NFTs.',
    },
];
