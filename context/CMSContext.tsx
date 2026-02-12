'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

// ── Types ──────────────────────────────────────────────────────────
export interface SiteSettings {
    // General
    site_name: string;
    site_tagline: string;
    site_logo: string;
    site_favicon: string;
    contact_email: string;
    contact_phone: string;
    contact_address: string;
    social_facebook: string;
    social_instagram: string;
    social_twitter: string;
    social_tiktok: string;
    social_youtube: string;
    social_snapchat: string;
    social_whatsapp: string;
    currency: string;
    currency_symbol: string;

    // Appearance / Theme
    primary_color: string;
    secondary_color: string;
    accent_color: string;
    header_bg: string;
    header_text: string;
    footer_bg: string;
    footer_text: string;

    // Hero Section
    hero_headline: string;
    hero_subheadline: string;
    hero_image: string;
    hero_video: string;
    hero_badge_label: string;
    hero_badge_text: string;
    hero_badge_subtext: string;
    hero_primary_btn_text: string;
    hero_primary_btn_link: string;
    hero_secondary_btn_text: string;
    hero_secondary_btn_link: string;
    hero_tag_text: string;
    hero_stat1_title: string;
    hero_stat1_desc: string;
    hero_stat2_title: string;
    hero_stat2_desc: string;
    hero_stat3_title: string;
    hero_stat3_desc: string;

    // Trust Features
    feature1_icon: string;
    feature1_title: string;
    feature1_desc: string;
    feature2_icon: string;
    feature2_title: string;
    feature2_desc: string;
    feature3_icon: string;
    feature3_title: string;
    feature3_desc: string;
    feature4_icon: string;
    feature4_title: string;
    feature4_desc: string;

    // About Page
    about_hero_title: string;
    about_hero_subtitle: string;
    about_story_title: string;
    about_story_content: string;
    about_story_image: string;
    about_founder_name: string;
    about_founder_title: string;
    about_mission1_title: string;
    about_mission1_content: string;
    about_mission2_title: string;
    about_mission2_content: string;
    about_values_title: string;
    about_values_subtitle: string;
    about_cta_title: string;
    about_cta_subtitle: string;

    // Contact Page
    contact_hero_title: string;
    contact_hero_subtitle: string;
    contact_hours: string;
    contact_whatsapp_hours: string;
    contact_map_link: string;
    contact_team_json: string;

    // Header
    header_logo_height: string;
    header_nav_links_json: string;
    header_show_search: string;
    header_show_wishlist: string;
    header_show_cart: string;
    header_show_account: string;

    // Footer
    footer_logo: string;
    footer_logo_height: string;
    footer_newsletter_title: string;
    footer_newsletter_subtitle: string;
    footer_show_newsletter: string;
    footer_col1_title: string;
    footer_col1_links_json: string;
    footer_col2_title: string;
    footer_col2_links_json: string;
    footer_col3_title: string;
    footer_col3_links_json: string;
    footer_copyright_text: string;
    footer_powered_by: string;
    footer_powered_by_link: string;

    // SEO
    seo_title: string;
    seo_description: string;
    seo_keywords: string;
    seo_og_image: string;
    seo_google_analytics: string;

    // Integrations
    integration_resend_api_key: string;
    integration_admin_email: string;
    integration_email_from: string;
    integration_moolre_api_user: string;
    integration_moolre_api_pubkey: string;
    integration_moolre_account_number: string;
    integration_moolre_merchant_email: string;
    integration_moolre_sms_api_key: string;
    integration_recaptcha_site_key: string;
    integration_recaptcha_secret_key: string;
    integration_app_url: string;

    [key: string]: string;
}

export interface CMSContent {
    id: string;
    section: string;
    block_key: string;
    title: string | null;
    subtitle: string | null;
    content: string | null;
    image_url: string | null;
    button_text: string | null;
    button_url: string | null;
    metadata: Record<string, any>;
    is_active: boolean;
}

export interface Banner {
    id: string;
    name: string;
    type: string;
    title: string | null;
    subtitle: string | null;
    image_url: string | null;
    background_color: string;
    text_color: string;
    button_text: string | null;
    button_url: string | null;
    is_active: boolean;
    position: string;
    start_date: string | null;
    end_date: string | null;
}

export interface CMSContextType {
    settings: SiteSettings;
    content: CMSContent[];
    banners: Banner[];
    loading: boolean;
    getContent: (section: string, blockKey: string) => CMSContent | undefined;
    getSetting: (key: string) => string;
    getSettingJSON: <T = any>(key: string, fallback: T) => T;
    getActiveBanners: (position?: string) => Banner[];
    refreshCMS: () => Promise<void>;
}

// ── Defaults ───────────────────────────────────────────────────────
export const defaultSettings: SiteSettings = {
    // General — DEQUEENSCROWN HAIRS
    site_name: 'DEQUEENSCROWN HAIRS',
    site_tagline: 'Premium human hair & wigs, made for queens.',
    site_logo: '/logo.png',
    site_favicon: '/favicon.ico',
    contact_email: 'dequeenscrownhair@gmail.com',
    contact_phone: '0204292019',
    contact_address: 'Ghana',
    social_facebook: '',
    social_instagram: 'https://www.instagram.com/de_queens_crown_hairs?igsh=anRyMHoybjgzYzJt',
    social_twitter: '',
    social_tiktok: 'https://www.tiktok.com/@de_queenscrownhair?_r=1&_t=ZT-93pSK4ZI97N',
    social_youtube: '',
    social_snapchat: 'https://www.snapchat.com/add/de_queenscrown?share_id=ozGgV0X-xMY&locale=en-GB',
    social_whatsapp: '0204292019',
    currency: 'GHS',
    currency_symbol: 'GH₵',

    // Appearance — black & white
    primary_color: '#000000',
    secondary_color: '#171717',
    accent_color: '#404040',
    header_bg: '#ffffff',
    header_text: '#171717',
    footer_bg: '#0a0a0a',
    footer_text: '#ffffff',

    // Hero
    hero_headline: 'Crown Your Look with Premium Hair',
    hero_subheadline: 'Human hair wigs & extensions, handpicked for quality and style.',
    hero_image: '/hero.jpg',
    hero_video: '/wighero.mp4',
    hero_badge_label: 'Exclusive Offer',
    hero_badge_text: '25% Off',
    hero_badge_subtext: 'On your first dedicated order',
    hero_primary_btn_text: 'Shop Collections',
    hero_primary_btn_link: '/shop',
    hero_secondary_btn_text: 'Our Story',
    hero_secondary_btn_link: '/about',
    hero_tag_text: 'New Collection',
    hero_stat1_title: 'Direct Import',
    hero_stat1_desc: 'Sourced from China',
    hero_stat2_title: 'Verified Quality',
    hero_stat2_desc: 'Inspected by hand',
    hero_stat3_title: 'Best Prices',
    hero_stat3_desc: 'Unbeatable value',

    // Trust Features
    feature1_icon: 'ri-store-2-line',
    feature1_title: 'Free Store Pickup',
    feature1_desc: 'Pick up at our store',
    feature2_icon: 'ri-arrow-left-right-line',
    feature2_title: 'Easy Returns',
    feature2_desc: '30-day return policy',
    feature3_icon: 'ri-customer-service-2-line',
    feature3_title: '24/7 Support',
    feature3_desc: 'Dedicated service',
    feature4_icon: 'ri-shield-check-line',
    feature4_title: 'Secure Payment',
    feature4_desc: 'Safe checkout',

    // About — DEQUEENSCROWN HAIRS
    about_hero_title: 'Our Story',
    about_hero_subtitle: 'Where quality hair meets the crown you deserve.',
    about_story_title: 'Built for Queens, by a Queen',
    about_story_content: 'De Queen\'s Crown Hairs started from a simple belief: every woman deserves to feel like royalty—without compromise on quality or style.\n\nWe source premium human hair and create wigs that look and feel like your own. No shortcuts, no synthetic substitutes where it matters. Just honest quality you can trust.\n\nWhether you\'re after a bold new look or a seamless everyday style, we\'re here to help you crown it.',
    about_story_image: '/about-wig.png',
    about_founder_name: 'De Queen\'s Crown Hairs',
    about_founder_title: 'Premium Hair & Wigs',
    about_mission1_title: 'Real Hair, Real Quality',
    about_mission1_content: 'We work with trusted suppliers to bring you 100% human hair—no mix-ups, no false claims. Every piece is chosen for texture, longevity, and that natural look you deserve.',
    about_mission2_title: 'Style That Fits Your Life',
    about_mission2_content: 'From sleek bobs to flowing lengths, we offer styles that match how you live. Our goal is to make premium hair accessible so you can switch it up whenever you want, with confidence.',
    about_values_title: 'Why Choose De Queen\'s Crown?',
    about_values_subtitle: 'Quality you can see, trust you can feel.',
    about_cta_title: 'Ready to Find Your Crown?',
    about_cta_subtitle: 'Explore our collection and discover the piece that’s made for you.',

    // Contact
    contact_hero_title: 'Get In Touch',
    contact_hero_subtitle: 'Questions about our hair or your order? We’re here to help.',
    contact_hours: 'Mon–Sat, 9am–6pm',
    contact_whatsapp_hours: 'Chat with us on WhatsApp',
    contact_map_link: 'https://maps.google.com',
    contact_team_json: '[]',

    // Header
    header_logo_height: '40',
    header_nav_links_json: JSON.stringify([
        { label: 'Shop', href: '/shop' },
        { label: 'Categories', href: '/categories' },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' }
    ]),
    header_show_search: 'true',
    header_show_wishlist: 'true',
    header_show_cart: 'true',
    header_show_account: 'true',

    // Footer
    footer_logo: '/logo.png',
    footer_logo_height: '56',
    footer_newsletter_title: 'Join Our Community',
    footer_newsletter_subtitle: 'Get exclusive access to new arrivals, secret sales, and more.',
    footer_show_newsletter: 'true',
    footer_col1_title: 'Shop',
    footer_col1_links_json: JSON.stringify([
        { label: 'All Products', href: '/shop' },
        { label: 'Categories', href: '/categories' },
        { label: 'New Arrivals', href: '/shop?sort=newest' },
        { label: 'Best Sellers', href: '/shop?sort=bestsellers' }
    ]),
    footer_col2_title: 'Customer Care',
    footer_col2_links_json: JSON.stringify([
        { label: 'Contact Us', href: '/contact' },
        { label: 'Track My Order', href: '/order-tracking' },
        { label: 'Shipping Info', href: '/shipping' },
        { label: 'Returns Policy', href: '/returns' }
    ]),
    footer_col3_title: 'Company',
    footer_col3_links_json: JSON.stringify([
        { label: 'Our Story', href: '/about' },
        { label: 'Blog', href: '/blog' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' }
    ]),
    footer_copyright_text: '',
    footer_powered_by: 'Doctor Barns Tech',
    footer_powered_by_link: 'https://doctorbarns.com',

    // SEO
    seo_title: '',
    seo_description: '',
    seo_keywords: '',
    seo_og_image: '',
    seo_google_analytics: '',

    // Integrations
    integration_resend_api_key: '',
    integration_admin_email: '',
    integration_email_from: '',
    integration_moolre_api_user: '',
    integration_moolre_api_pubkey: '',
    integration_moolre_account_number: '',
    integration_moolre_merchant_email: '',
    integration_moolre_sms_api_key: '',
    integration_recaptcha_site_key: '',
    integration_recaptcha_secret_key: '',
    integration_app_url: '',
};

const CMSContext = createContext<CMSContextType>({
    settings: defaultSettings,
    content: [],
    banners: [],
    loading: true,
    getContent: () => undefined,
    getSetting: () => '',
    getSettingJSON: (_key, fallback) => fallback,
    getActiveBanners: () => [],
    refreshCMS: async () => { },
});

// ── Provider ───────────────────────────────────────────────────────
export function CMSProvider({ children }: { children: ReactNode }) {
    const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
    const [content, setContent] = useState<CMSContent[]>([]);
    const [banners, setBanners] = useState<Banner[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchCMSData = useCallback(async () => {
        try {
            // Fetch store_settings
            const { data: settingsData, error: settingsError } = await supabase
                .from('store_settings')
                .select('key, value');

            if (!settingsError && settingsData) {
                const merged = { ...defaultSettings };
                settingsData.forEach((row: any) => {
                    if (row.key && row.value !== null && row.value !== undefined) {
                        // value is jsonb, could be a string or object
                        merged[row.key] = typeof row.value === 'string' ? row.value : JSON.stringify(row.value);
                    }
                });
                setSettings(merged);
            }

            // Fetch CMS content blocks
            const { data: contentData, error: contentError } = await supabase
                .from('cms_content')
                .select('*')
                .eq('is_active', true);

            if (!contentError && contentData) {
                setContent(contentData);
            }

            // Fetch banners
            const { data: bannersData, error: bannersError } = await supabase
                .from('banners')
                .select('*')
                .eq('is_active', true)
                .order('sort_order');

            if (!bannersError && bannersData) {
                setBanners(bannersData);
            }
        } catch (err) {
            console.warn('CMSProvider: Failed to fetch CMS data', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCMSData();
    }, [fetchCMSData]);

    const getContent = (section: string, blockKey: string): CMSContent | undefined => {
        return content.find(c => c.section === section && c.block_key === blockKey);
    };

    const getSetting = (key: string): string => {
        return settings[key] || defaultSettings[key] || '';
    };

    const getSettingJSON = <T = any,>(key: string, fallback: T): T => {
        const raw = settings[key];
        if (!raw) return fallback;
        try {
            return JSON.parse(raw) as T;
        } catch {
            return fallback;
        }
    };

    const getActiveBanners = (position?: string): Banner[] => {
        const now = new Date();
        return banners.filter(b => {
            if (position && b.position !== position) return false;
            if (b.start_date && new Date(b.start_date) > now) return false;
            if (b.end_date && new Date(b.end_date) < now) return false;
            return b.is_active;
        });
    };

    return (
        <CMSContext.Provider
            value={{
                settings,
                content,
                banners,
                loading,
                getContent,
                getSetting,
                getSettingJSON,
                getActiveBanners,
                refreshCMS: fetchCMSData,
            }}
        >
            {children}
        </CMSContext.Provider>
    );
}

export function useCMS() {
    const context = useContext(CMSContext);
    if (!context) {
        throw new Error('useCMS must be used within a CMSProvider');
    }
    return context;
}

export default CMSContext;
